"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerV1 = void 0;
const content_router_1 = __importDefault(require("./content.router"));
const me_router_1 = __importDefault(require("./me.router"));
const transaction_router_1 = __importDefault(require("./transaction.router"));
const auth_router_1 = __importDefault(require("./auth.router"));
const oauth_router_1 = __importDefault(require("./oauth.router"));
const error_middleware_1 = require("@app/middlewares/error.middleware");
const routerV1 = (app) => {
    const baseV1Url = '/api/v1';
    app.use(baseV1Url + '/auth', auth_router_1.default);
    app.use(baseV1Url + '/oauth', oauth_router_1.default);
    app.use(baseV1Url + '/contents', content_router_1.default);
    app.use(baseV1Url + '/me', me_router_1.default);
    app.use(baseV1Url + '/', transaction_router_1.default);
    app.use(error_middleware_1.ErrorMiddleware.handle);
};
exports.routerV1 = routerV1;
