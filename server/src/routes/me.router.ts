import { MeController } from '@app/controllers/me.controller';
import { AuthorizeMiddleware } from '@app/middlewares/authorize.middleware';
import { Router } from 'express';

const router = Router();

router
  .route('/')
  .get(AuthorizeMiddleware.use(), MeController.use('getProfile'));

router
  .route('/plan')
  .post(AuthorizeMiddleware.use(), MeController.use('upgradePlan'));

export default router;
