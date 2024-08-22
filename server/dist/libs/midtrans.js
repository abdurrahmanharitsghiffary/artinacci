"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.midtransApi = void 0;
const midtrans_client_typescript_1 = require("@miwone/midtrans-client-typescript");
exports.midtransApi = new midtrans_client_typescript_1.Midtrans.Snap({
    clientKey: process.env.MID_CLIENT_KEY,
    serverKey: process.env.MID_SERVER_KEY,
    isProduction: false,
});
