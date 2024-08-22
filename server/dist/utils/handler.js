"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
class Handler {
    static use(key = 'handle') {
        const instance = new this();
        // @ts-expect-error loler
        return this.tryCatch(instance[key]);
    }
    static tryCatch(handler) {
        return async (req, res, next) => {
            try {
                await handler(req, res, next);
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.Handler = Handler;
