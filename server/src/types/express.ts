import { NextFunction, Request, Response } from 'express';

export type LoggedUser = {
  id: number;
  email: string;
};

declare global {
  namespace Express {
    export interface User extends LoggedUser {}
  }
}

export type AppHandler<T> = (
  req: AppRequest,
  res: AppResponse,
  next: NextFunction
) => T;
export type AppRequest = Request;
export type AppResponse = Response;
