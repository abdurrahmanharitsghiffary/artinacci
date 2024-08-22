"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyRoleMiddleware = void 0;
const prismaClient_1 = require("@app/libs/prismaClient");
const handler_1 = require("@app/utils/handler");
const http_exception_1 = require("@app/utils/http-exception");
class VerifyRoleMiddleware {
    static verifyRoles(roles) {
        return handler_1.Handler.tryCatch(async (req, res, next) => {
            const user = await prismaClient_1.prismaClient.user.findUnique({
                where: { id: req.user?.id },
            });
            if (!user?.role)
                return next();
            if (!roles.includes(user?.role))
                throw new http_exception_1.ForbiddenException('Forbidden resource.');
            return next();
        });
    }
}
exports.VerifyRoleMiddleware = VerifyRoleMiddleware;
