"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutPlanDto = void 0;
const zod_1 = require("zod");
exports.checkoutPlanDto = zod_1.z.object({
    type: zod_1.z.enum(['B', 'C']),
});
