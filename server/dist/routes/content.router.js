"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_controller_1 = require("@app/controllers/content.controller");
const authorize_middleware_1 = require("@app/middlewares/authorize.middleware");
const verify_role_middleware_1 = require("@app/middlewares/verify-role.middleware");
const express_1 = require("express");
const router = (0, express_1.Router)();
router
    .route('/')
    .get(authorize_middleware_1.AuthorizeMiddleware.use(), content_controller_1.ContentController.use('find'))
    .post(authorize_middleware_1.AuthorizeMiddleware.use(), verify_role_middleware_1.VerifyRoleMiddleware.verifyRoles(['ADMIN']), content_controller_1.ContentController.use('store'));
router
    .route('/:id')
    .get(authorize_middleware_1.AuthorizeMiddleware.use(), content_controller_1.ContentController.use('findOne'))
    .patch(authorize_middleware_1.AuthorizeMiddleware.use(), verify_role_middleware_1.VerifyRoleMiddleware.verifyRoles(['ADMIN']), content_controller_1.ContentController.use('update'))
    .delete(verify_role_middleware_1.VerifyRoleMiddleware.verifyRoles(['ADMIN']), authorize_middleware_1.AuthorizeMiddleware.use(), content_controller_1.ContentController.use('destroy'));
exports.default = router;
