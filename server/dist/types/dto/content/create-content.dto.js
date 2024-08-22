"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContentDto = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createContentDto = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string().optional(),
    type: zod_1.default.enum(['ARTICLE', 'VIDEO']),
    attachments: zod_1.default.array(zod_1.default.string()),
});
