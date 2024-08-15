import { prismaClient } from '@app/libs/prismaClient';
import { JwtService } from '@app/services/jwt.service';
import { AppRequest, AppResponse, LoggedUser } from '@app/types/express';
import { Handler } from '@app/utils/handler';
import { UnauthorizedException } from '@app/utils/http-exception';
import { NextFunction } from 'express';

export class AuthorizeMiddleware extends Handler {
  async handle(req: AppRequest, res: AppResponse, next: NextFunction) {
    const [tokenType, token] = (req.headers.authorization ?? '').split(' ');
    if (!token) throw new UnauthorizedException('No token provided.');
    if (tokenType !== 'Bearer')
      throw new UnauthorizedException('Invalid token type.');

    const accessToken = await prismaClient.token.findUnique({
      where: { token },
    });

    if (!accessToken) throw new UnauthorizedException('Invalid token.');

    const decoded = (await JwtService.verify(token)) as LoggedUser;

    if (!decoded) throw new UnauthorizedException('Invalid token.');

    req.user = { email: decoded.email, id: decoded.id };

    return next();
  }
}
