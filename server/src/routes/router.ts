import { Application } from 'express';

import contentRouter from './content.router';
import meRouter from './me.router';
import authRouter from './auth.router';
import oauthRouter from './oauth.router';

import { ErrorMiddleware } from '@app/middlewares/error.middleware';

export const routerV1 = (app: Application) => {
  const baseV1Url = '/api/v1';

  app.use(baseV1Url + '/auth', authRouter);
  app.use(baseV1Url + '/oauth', oauthRouter);
  app.use(baseV1Url + '/contents', contentRouter);
  app.use(baseV1Url + '/me', meRouter);

  app.use(ErrorMiddleware.handle);
};
