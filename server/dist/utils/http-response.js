"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
class HttpResponse {
    data;
    statusCode;
    message;
    errors;
    constructor(data, statusCode, message, errors) {
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
    }
}
exports.HttpResponse = HttpResponse;
