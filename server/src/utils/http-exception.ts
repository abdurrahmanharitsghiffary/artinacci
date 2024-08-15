import { ApiResponse } from '@app/types/api';
import { ZodError, ZodIssue } from 'zod';

export class HttpException implements ApiResponse<null> {
  data = null;
  code = 'E_HttpException';
  constructor(
    public message: string,
    public statusCode: number
  ) {}
}

export class NotFoundException extends HttpException {
  code = 'E_NotFoundException';
  constructor(message: string) {
    super(message, 404);
  }
}

export class BadRequestException extends HttpException {
  code = 'E_BadRequestException';
  constructor(message: string) {
    super(message, 400);
  }
}

export class ForbiddenException extends HttpException {
  code = 'E_ForbiddenException';
  constructor(message: string) {
    super(message, 403);
  }
}

export class OAuthVerifyException extends HttpException {
  code = 'E_OAuthVerifyException';
  constructor(message: string) {
    super(message, 403);
  }
}

export class UnauthorizedException extends HttpException {
  code = 'E_UnauthorizedException';
  constructor(message: string) {
    super(message, 401);
  }
}

export class ZodValidateBodyException extends ZodError {
  constructor(issues: ZodIssue[]) {
    super(issues);
  }
}

export class ZodValidateQueryException extends ZodError {
  constructor(issues: ZodIssue[]) {
    super(issues);
  }
}

export class ZodValidateParamsException extends ZodError {
  constructor(issues: ZodIssue[]) {
    super(issues);
  }
}
