import { prismaClient } from '@app/libs/prismaClient';
import { AppRequest, AppResponse } from '@app/types/express';
import { Handler } from '@app/utils/handler';
import { ForbiddenException } from '@app/utils/http-exception';
import { $Enums } from '@prisma/client';
import { NextFunction } from 'express';

export class VerifyRoleMiddleware {
  static verifyRoles(roles: $Enums.UserRole[]) {
    return Handler.tryCatch(
      async (req: AppRequest, res: AppResponse, next: NextFunction) => {
        const user = await prismaClient.user.findUnique({
          where: { id: req.user?.id },
        });

        if (!user?.role) return next();

        if (!roles.includes(user?.role))
          throw new ForbiddenException('Forbidden resource.');
        return next();
      }
    );
  }
}
