"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const title_json_1 = __importDefault(require("./data/title.json"));
const content_json_1 = __importDefault(require("./data/content.json"));
const prisma = new client_1.PrismaClient();
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
        data: title_json_1.default.map((title, i) => ({
            type: 'ARTICLE',
            title,
            content: content_json_1.default[i],
            attachments: [`${process.env.BASE_URL}/uploads/sengsei.webp`],
        })),
    });
    await prisma.content.createMany({
        data: title_json_1.default.map((title, i) => ({
            type: 'VIDEO',
            title,
            content: content_json_1.default[i],
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
