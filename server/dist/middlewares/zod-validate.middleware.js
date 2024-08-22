"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidateMiddleware = void 0;
const handler_1 = require("@app/utils/handler");
class ZodValidateMiddleware {
    static validateBody(zodSchema) {
        return handler_1.Handler.tryCatch(async (req, res, next) => {
            await zodSchema.parseAsync(req.body);
            next();
        });
    }
}
exports.ZodValidateMiddleware = ZodValidateMiddleware;
