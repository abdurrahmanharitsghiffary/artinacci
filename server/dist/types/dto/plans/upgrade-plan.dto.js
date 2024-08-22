"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradePlanDto = void 0;
const zod_1 = require("zod");
exports.upgradePlanDto = zod_1.z.object({
    planType: zod_1.z.enum(['A', 'B', 'C']),
});
