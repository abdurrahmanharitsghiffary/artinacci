import { prismaClient } from '@app/libs/prismaClient';
import { CreateContentDTO } from '@app/types/dto/content/create-content.dto';
import { UpdateContentDTO } from '@app/types/dto/content/update-content.dto';
import { NotFoundException } from '@app/utils/http-exception';
import { Content, User } from '@prisma/client';

export class ContentService {
  async checkContentMustExists(id: Content['id']) {
    const content = await prismaClient.content.findUnique({ where: { id } });
    if (!content) throw new NotFoundException('Content not found');
    return content;
  }

  findOne(id: Content['id']) {
    return this.checkContentMustExists(id);
  }

  async find(maxContentPerType: number | undefined) {
    console.log(maxContentPerType, 'ON');
    const articles = await prismaClient.content.findMany({
      where: { type: 'ARTICLE' },
      orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
      take: maxContentPerType,
    });

    const videos = await prismaClient.content.findMany({
      where: { type: 'VIDEO' },
      orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
      take: maxContentPerType,
    });

    return { articles, videos };
  }

  async destroy(id: Content['id']) {
    await this.checkContentMustExists(id);
    return prismaClient.content.delete({ where: { id } });
  }

  async update(id: Content['id'], dto: UpdateContentDTO) {
    await this.checkContentMustExists(id);
    return prismaClient.content.update({ where: { id }, data: dto });
  }

  store(userId: User['id'], dto: CreateContentDTO) {
    return prismaClient.content.create({ data: { userId, ...dto } });
  }
}
