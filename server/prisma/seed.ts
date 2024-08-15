import { PrismaClient } from '@prisma/client';
import randomTitle from './data/title.json';
import randomContent from './data/content.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    update: {},
    create: {
      fullName: 'Abdurrahman Harits Ghiffary',
      identifier: 'abdmanharits@gmail.com',
      password: '12345678',
      username: 'abdhg12',
      role: 'ADMIN',
    },
    where: { identifier: 'abdmanharits@gmail.com' },
  });

  await prisma.membership.createMany({
    data: [
      { maxContentPerType: 3, type: 'A' },
      { maxContentPerType: 10, type: 'B' },
      { maxContentPerType: undefined, type: 'C' },
    ],
  });

  await prisma.content.createMany({
    data: randomTitle.map((title, i) => ({
      type: 'ARTICLE',
      title,
      content: randomContent[i],
      attachments: [`${process.env.BASE_URL}/uploads/sengsei.webp`],
    })),
  });

  await prisma.content.createMany({
    data: randomTitle.map((title, i) => ({
      type: 'VIDEO',
      title,
      content: randomContent[i],
      attachments: [
        'https://www.youtube.com/embed/wzqygKSJqEY?si=3C7kebSJqcJugqOw',
      ],
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
