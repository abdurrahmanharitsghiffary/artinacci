"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const me_controller_1 = require("@app/controllers/me.controller");
const authorize_middleware_1 = require("@app/middlewares/authorize.middleware");
const express_1 = require("express");
const router = (0, express_1.Router)();
router
    .route('/')
    .get(authorize_middleware_1.AuthorizeMiddleware.use(), me_controller_1.MeController.use('getProfile'));
router
    .route('/plan')
    .post(authorize_middleware_1.AuthorizeMiddleware.use(), me_controller_1.MeController.use('upgradePlan'));
exports.default = router;
