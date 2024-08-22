"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const router_1 = require("./routes/router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
(0, router_1.routerV1)(app);
exports.default = app;
