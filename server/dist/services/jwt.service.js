"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtService {
    static verify(token) {
        return new Promise((resolve, reject) => {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET ?? '');
            resolve(decoded);
        });
    }
    static sign(payload) {
        return new Promise((resolve) => {
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET ?? '', {
                expiresIn: '7d',
            });
            resolve(token);
        });
    }
}
exports.JwtService = JwtService;
