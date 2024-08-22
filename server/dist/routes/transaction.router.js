"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_controller_1 = require("@app/controllers/transaction.controller");
const authorize_middleware_1 = require("@app/middlewares/authorize.middleware");
const zod_validate_middleware_1 = require("@app/middlewares/zod-validate.middleware");
const checkout_plan_dto_1 = require("@app/types/dto/plans/checkout-plan.dto");
const express_1 = require("express");
const router = (0, express_1.Router)();
router
    .route('/plans/checkout')
    .post(authorize_middleware_1.AuthorizeMiddleware.use(), zod_validate_middleware_1.ZodValidateMiddleware.validateBody(checkout_plan_dto_1.checkoutPlanDto), transaction_controller_1.TransactionController.use('checkout'));
router
    .route('/payments/notification')
    .post(transaction_controller_1.TransactionController.use('webhookMidtrans'));
router
    .route('/payments/success')
    .get(transaction_controller_1.TransactionController.use('successPayment'));
router.route('/payments/error').get(transaction_controller_1.TransactionController.use('failedPayment'));
exports.default = router;
