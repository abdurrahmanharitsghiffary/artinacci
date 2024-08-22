import { AppRequest, AppResponse } from '@app/types/express';
import { Handler } from '@app/utils/handler';
import { NextFunction } from 'express';
import { ZodSchema } from 'zod';

export class ZodValidateMiddleware {
  static validateBody(zodSchema: ZodSchema<any>) {
    return Handler.tryCatch(
      async (req: AppRequest, res: AppResponse, next: NextFunction) => {
        await zodSchema.parseAsync(req.body);
        next();
      }
    );
  }
}
