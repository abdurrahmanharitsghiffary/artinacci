"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const prismaClient_1 = require("@app/libs/prismaClient");
const http_exception_1 = require("@app/utils/http-exception");
class ContentService {
    async checkContentMustExists(id) {
        const content = await prismaClient_1.prismaClient.content.findUnique({ where: { id } });
        if (!content)
            throw new http_exception_1.NotFoundException('Content not found');
        return content;
    }
    findOne(id) {
        return this.checkContentMustExists(id);
    }
    async find(maxContentPerType) {
        console.log(maxContentPerType, 'ON');
        const articles = await prismaClient_1.prismaClient.content.findMany({
            where: { type: 'ARTICLE' },
            orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
            take: maxContentPerType,
        });
        const videos = await prismaClient_1.prismaClient.content.findMany({
            where: { type: 'VIDEO' },
            orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
            take: maxContentPerType,
        });
        return { articles, videos };
    }
    async destroy(id) {
        await this.checkContentMustExists(id);
        return prismaClient_1.prismaClient.content.delete({ where: { id } });
    }
    async update(id, dto) {
        await this.checkContentMustExists(id);
        return prismaClient_1.prismaClient.content.update({ where: { id }, data: dto });
    }
    store(userId, dto) {
        return prismaClient_1.prismaClient.content.create({ data: { userId, ...dto } });
    }
}
exports.ContentService = ContentService;
