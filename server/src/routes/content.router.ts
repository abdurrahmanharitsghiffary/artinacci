import { ContentController } from '@app/controllers/content.controller';
import { AuthorizeMiddleware } from '@app/middlewares/authorize.middleware';
import { VerifyRoleMiddleware } from '@app/middlewares/verify-role.middleware';
import { Router } from 'express';

const router = Router();

router
  .route('/')
  .get(AuthorizeMiddleware.use(), ContentController.use('find'))
  .post(
    AuthorizeMiddleware.use(),
    VerifyRoleMiddleware.verifyRoles(['ADMIN']),
    ContentController.use('store')
  );

router
  .route('/:id')
  .get(AuthorizeMiddleware.use(), ContentController.use('findOne'))
  .patch(
    AuthorizeMiddleware.use(),
    VerifyRoleMiddleware.verifyRoles(['ADMIN']),
    ContentController.use('update')
  )
  .delete(
    VerifyRoleMiddleware.verifyRoles(['ADMIN']),
    AuthorizeMiddleware.use(),
    ContentController.use('destroy')
  );

export default router;
