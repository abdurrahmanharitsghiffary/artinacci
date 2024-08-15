import { AuthController } from '@app/controllers/auth.controller';
import { AuthorizeMiddleware } from '@app/middlewares/authorize.middleware';
import { ZodValidateMiddleware } from '@app/middlewares/zod-validate.middleware';
import { signInDto, signUpDto } from '@app/types/dto/auth/auth.dto';
import { Router } from 'express';
import { z } from 'zod';

const router = Router();

router
  .route('/sign-in')
  .post(
    ZodValidateMiddleware.validateBody(signInDto),
    AuthController.use('signIn')
  );

router.route('/verify-code').post(
  ZodValidateMiddleware.validateBody(
    z.object({
      code: z.string(),
    })
  ),
  AuthController.use('verifyCode')
);

router
  .route('/sign-up')
  .post(
    ZodValidateMiddleware.validateBody(signUpDto),
    AuthController.use('signUp')
  );

router.route('/sign-out').delete(
  AuthorizeMiddleware.use(),
  ZodValidateMiddleware.validateBody(
    z.object({
      isLogoutFromAllDevice: z.boolean().optional(),
      token: z.string().optional(),
    })
  ),
  AuthController.use('revoke')
);

export default router;
