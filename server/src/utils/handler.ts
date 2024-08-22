import { AppHandler, AppRequest, AppResponse } from '@app/types/express';
import { NextFunction } from 'express';

type HandlerKey =
  | 'handle'
  | 'update'
  | 'destroy'
  | 'find'
  | 'findOne'
  | 'store'
  | string;

export class Handler {
  static use(key: HandlerKey = 'handle') {
    const instance = new this();
    // @ts-expect-error loler
    return this.tryCatch(instance[key]);
  }

  static tryCatch(handler: AppHandler<any>) {
    return async (req: AppRequest, res: AppResponse, next: NextFunction) => {
      try {
        await handler(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  }
}
