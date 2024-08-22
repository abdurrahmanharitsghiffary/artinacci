"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeMiddleware = void 0;
const prismaClient_1 = require("@app/libs/prismaClient");
const jwt_service_1 = require("@app/services/jwt.service");
const handler_1 = require("@app/utils/handler");
const http_exception_1 = require("@app/utils/http-exception");
class AuthorizeMiddleware extends handler_1.Handler {
    async handle(req, res, next) {
        const [tokenType, token] = (req.headers.authorization ?? '').split(' ');
        if (!token)
            throw new http_exception_1.UnauthorizedException('No token provided.');
        if (tokenType !== 'Bearer')
            throw new http_exception_1.UnauthorizedException('Invalid token type.');
        const accessToken = await prismaClient_1.prismaClient.token.findUnique({
            where: { token },
        });
        if (!accessToken)
            throw new http_exception_1.UnauthorizedException('Invalid token.');
        const decoded = (await jwt_service_1.JwtService.verify(token));
        if (!decoded)
            throw new http_exception_1.UnauthorizedException('Invalid token.');
        req.user = { email: decoded.email, id: decoded.id };
        return next();
    }
}
exports.AuthorizeMiddleware = AuthorizeMiddleware;
