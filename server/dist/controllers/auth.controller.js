"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const prismaClient_1 = require("@app/libs/prismaClient");
const jwt_service_1 = require("@app/services/jwt.service");
const handler_1 = require("@app/utils/handler");
const http_exception_1 = require("@app/utils/http-exception");
const http_response_1 = require("@app/utils/http-response");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthController extends handler_1.Handler {
    async verifyCode(req, res) {
        const code = await prismaClient_1.prismaClient.code.findUnique({
            where: { code: req.body?.code },
            include: { token: { select: { userId: true, token: true } } },
        });
        if (!code || !code?.token)
            throw new http_exception_1.UnauthorizedException('Invalid verification code.');
        return res
            .status(200)
            .json(new http_response_1.HttpResponse({ accessToken: code.token.token }, 200));
    }
    async signIn(req, res) {
        const { email, password } = req.body;
        const user = await prismaClient_1.prismaClient.user.findUnique({
            where: { identifier: email },
        });
        if (!user)
            throw new http_exception_1.BadRequestException('Invalid credetials.');
        const isPasswordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch)
            throw new http_exception_1.BadRequestException('Invalid credentials.');
        const accessToken = await jwt_service_1.JwtService.sign({
            id: user.id,
            email: user.identifier,
        });
        await prismaClient_1.prismaClient.token.create({
            data: { token: accessToken, type: 'ACCESS_TOKEN', userId: user.id },
        });
        return res.status(200).json(new http_response_1.HttpResponse({ accessToken }, 200));
    }
    async signUp(req, res) {
        const { email, fullName, password, username } = req.body;
        const isUserExists = await prismaClient_1.prismaClient.user.count({
            where: { OR: [{ identifier: email }, { username }] },
        });
        if (isUserExists > 0)
            throw new http_exception_1.BadRequestException('Username or email already exists.');
        const hashedPassword = await bcrypt_1.default.hash(password, +(process?.env?.SALT ?? 10));
        const newUser = await prismaClient_1.prismaClient.user.create({
            data: {
                fullName,
                identifier: email,
                password: hashedPassword,
                username,
                membershipId: 1,
            },
        });
        const accessToken = await jwt_service_1.JwtService.sign({
            id: newUser.id,
            email: newUser.identifier,
        });
        await prismaClient_1.prismaClient.token.create({
            data: { token: accessToken, type: 'ACCESS_TOKEN', userId: newUser.id },
        });
        return res.status(200).json(new http_response_1.HttpResponse({ accessToken }, 200));
    }
    async revoke(req, res) {
        const { isLogoutFromAllDevice = false, token } = req.body;
        if (!req?.user)
            throw new http_exception_1.UnauthorizedException('You are not authenticated.');
        const user = await prismaClient_1.prismaClient.user.findUnique({
            where: { id: req?.user?.id },
        });
        if (isLogoutFromAllDevice) {
            await prismaClient_1.prismaClient.token.deleteMany({ where: { userId: user?.id } });
        }
        else {
            const accessToken = await prismaClient_1.prismaClient.token.findUnique({
                where: { token },
            });
            if (accessToken && accessToken.userId === req?.user?.id) {
                await prismaClient_1.prismaClient.token.delete({ where: { token } });
            }
        }
        return res.status(204).json(new http_response_1.HttpResponse(null, 204));
    }
}
exports.AuthController = AuthController;
