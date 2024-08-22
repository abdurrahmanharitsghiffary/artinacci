import { AppRequest, AppResponse } from '@app/types/express';
import {
  HttpException,
  OAuthVerifyException,
  ZodValidateBodyException,
  ZodValidateParamsException,
  ZodValidateQueryException,
} from '@app/utils/http-exception';
import { HttpResponse } from '@app/utils/http-response';
import { NextFunction } from 'express';
import { ZodError } from 'zod';

export class ErrorMiddleware {
  static async handle(
    err: any,
    req: AppRequest,
    res: AppResponse,
    next: NextFunction
  ) {
    console.error(err, 'ERROR');
    if (err instanceof HttpException) {
      return res.status(err.statusCode).json(err);
    } else if (err instanceof OAuthVerifyException) {
      return res.redirect(process.env.CLIENT_URL + '/auth/sign-in');
    } else if (err instanceof ZodError) {
      let message = 'Failed to validate request input';
      if (err instanceof ZodValidateBodyException) {
        message = 'Failed to validate request body.';
      } else if (err instanceof ZodValidateQueryException) {
        message = 'Failed to validate query params.';
      } else if (err instanceof ZodValidateParamsException) {
        message = 'Failed to validate params.';
      }

      return res
        .status(422)
        .json(new HttpResponse(null, 422, message, err.issues));
    } else {
      return res
        .status(500)
        .json(new HttpResponse(null, 500, 'Internal server error.'));
    }
  }
}
