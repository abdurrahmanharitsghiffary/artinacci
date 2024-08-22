"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidateParamsException = exports.ZodValidateQueryException = exports.ZodValidateBodyException = exports.UnauthorizedException = exports.OAuthVerifyException = exports.ForbiddenException = exports.BadRequestException = exports.NotFoundException = exports.HttpException = void 0;
const zod_1 = require("zod");
class HttpException {
    message;
    statusCode;
    data = null;
    code = 'E_HttpException';
    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.HttpException = HttpException;
class NotFoundException extends HttpException {
    code = 'E_NotFoundException';
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundException = NotFoundException;
class BadRequestException extends HttpException {
    code = 'E_BadRequestException';
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestException = BadRequestException;
class ForbiddenException extends HttpException {
    code = 'E_ForbiddenException';
    constructor(message) {
        super(message, 403);
    }
}
exports.ForbiddenException = ForbiddenException;
class OAuthVerifyException extends HttpException {
    code = 'E_OAuthVerifyException';
    constructor(message) {
        super(message, 403);
    }
}
exports.OAuthVerifyException = OAuthVerifyException;
class UnauthorizedException extends HttpException {
    code = 'E_UnauthorizedException';
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ZodValidateBodyException extends zod_1.ZodError {
    constructor(issues) {
        super(issues);
    }
}
exports.ZodValidateBodyException = ZodValidateBodyException;
class ZodValidateQueryException extends zod_1.ZodError {
    constructor(issues) {
        super(issues);
    }
}
exports.ZodValidateQueryException = ZodValidateQueryException;
class ZodValidateParamsException extends zod_1.ZodError {
    constructor(issues) {
        super(issues);
    }
}
exports.ZodValidateParamsException = ZodValidateParamsException;
