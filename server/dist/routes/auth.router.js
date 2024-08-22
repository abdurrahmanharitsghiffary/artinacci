"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("@app/controllers/auth.controller");
const authorize_middleware_1 = require("@app/middlewares/authorize.middleware");
const zod_validate_middleware_1 = require("@app/middlewares/zod-validate.middleware");
const auth_dto_1 = require("@app/types/dto/auth/auth.dto");
const express_1 = require("express");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
router
    .route('/sign-in')
    .post(zod_validate_middleware_1.ZodValidateMiddleware.validateBody(auth_dto_1.signInDto), auth_controller_1.AuthController.use('signIn'));
router.route('/verify-code').post(zod_validate_middleware_1.ZodValidateMiddleware.validateBody(zod_1.z.object({
    code: zod_1.z.string(),
})), auth_controller_1.AuthController.use('verifyCode'));
router
    .route('/sign-up')
    .post(zod_validate_middleware_1.ZodValidateMiddleware.validateBody(auth_dto_1.signUpDto), auth_controller_1.AuthController.use('signUp'));
router.route('/sign-out').delete(authorize_middleware_1.AuthorizeMiddleware.use(), zod_validate_middleware_1.ZodValidateMiddleware.validateBody(zod_1.z.object({
    isLogoutFromAllDevice: zod_1.z.boolean().optional(),
    token: zod_1.z.string().optional(),
})), auth_controller_1.AuthController.use('revoke'));
exports.default = router;
