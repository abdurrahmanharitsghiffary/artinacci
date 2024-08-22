import { TransactionController } from '@app/controllers/transaction.controller';
import { AuthorizeMiddleware } from '@app/middlewares/authorize.middleware';
import { ZodValidateMiddleware } from '@app/middlewares/zod-validate.middleware';
import { checkoutPlanDto } from '@app/types/dto/plans/checkout-plan.dto';
import { Router } from 'express';

const router = Router();

router
  .route('/plans/checkout')
  .post(
    AuthorizeMiddleware.use(),
    ZodValidateMiddleware.validateBody(checkoutPlanDto),
    TransactionController.use('checkout')
  );

router
  .route('/payments/notification')
  .post(TransactionController.use('webhookMidtrans'));

router
  .route('/payments/success')
  .get(TransactionController.use('successPayment'));

router.route('/payments/error').get(TransactionController.use('failedPayment'));

export default router;
