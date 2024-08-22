"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpDto = exports.signInDto = void 0;
const zod_1 = require("zod");
exports.signInDto = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
exports.signUpDto = zod_1.z.object({
    fullName: zod_1.z.string(),
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
