"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentController = void 0;
const handler_1 = require("../utils/handler");
const http_response_1 = require("@app/utils/http-response");
const content_service_1 = require("@app/services/content.service");
const prismaClient_1 = require("@app/libs/prismaClient");
class ContentController extends handler_1.Handler {
    async findOne(req, res) {
        const contentService = new content_service_1.ContentService();
        const content = await contentService.findOne(+req.params.id);
        return res.status(200).json(new http_response_1.HttpResponse(content, 200));
    }
    async find(req, res) {
        const contentService = new content_service_1.ContentService();
        const user = await prismaClient_1.prismaClient.user.findUnique({
            where: { id: req.user?.id },
            select: {
                role: true,
                membership: { select: { maxContentPerType: true } },
            },
        });
        const isAdmin = user?.role === 'ADMIN';
        console.log(user, 'USER');
        const contents = await contentService.find(isAdmin
            ? undefined
            : user?.membership?.maxContentPerType === null
                ? undefined
                : (user?.membership?.maxContentPerType ?? 3));
        return res.status(200).json(new http_response_1.HttpResponse(contents, 200));
    }
    async destroy(req, res) {
        const contentService = new content_service_1.ContentService();
        await contentService.destroy(+req.params.id);
        return res.status(204).json(new http_response_1.HttpResponse(null, 204));
    }
    async update(req, res) {
        const contentService = new content_service_1.ContentService();
        const { attachments, description, title, type } = req.body;
        await contentService.update(+req.params.id, {
            attachments,
            description,
            title,
            type,
        });
        return res.status(204).json(new http_response_1.HttpResponse(null, 204));
    }
    async store(req, res) {
        const contentService = new content_service_1.ContentService();
        const { attachments, description, title, type } = req.body;
        await contentService.store(+req.params.id, {
            attachments,
            description,
            title,
            type,
        });
        return res.status(201).json(new http_response_1.HttpResponse(null, 201));
    }
}
exports.ContentController = ContentController;
