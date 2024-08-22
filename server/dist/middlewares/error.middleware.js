"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const http_exception_1 = require("@app/utils/http-exception");
const http_response_1 = require("@app/utils/http-response");
const zod_1 = require("zod");
class ErrorMiddleware {
    static async handle(err, req, res, next) {
        console.error(err, 'ERROR');
        if (err instanceof http_exception_1.HttpException) {
            return res.status(err.statusCode).json(err);
        }
        else if (err instanceof http_exception_1.OAuthVerifyException) {
            return res.redirect(process.env.CLIENT_URL + '/auth/sign-in');
        }
        else if (err instanceof zod_1.ZodError) {
            let message = 'Failed to validate request input';
            if (err instanceof http_exception_1.ZodValidateBodyException) {
                message = 'Failed to validate request body.';
            }
            else if (err instanceof http_exception_1.ZodValidateQueryException) {
                message = 'Failed to validate query params.';
            }
            else if (err instanceof http_exception_1.ZodValidateParamsException) {
                message = 'Failed to validate params.';
            }
            return res
                .status(422)
                .json(new http_response_1.HttpResponse(null, 422, message, err.issues));
        }
        else {
            return res
                .status(500)
                .json(new http_response_1.HttpResponse(null, 500, 'Internal server error.'));
        }
    }
}
exports.ErrorMiddleware = ErrorMiddleware;
