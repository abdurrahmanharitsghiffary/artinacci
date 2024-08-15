import { prismaClient } from '@app/libs/prismaClient';
import { AppRequest, AppResponse } from '@app/types/express';
import { genUsername } from '@app/utils/gen-username';
import crypto from 'crypto';
import {
  ForbiddenException,
  OAuthVerifyException,
} from '@app/utils/http-exception';
import { $Enums, Prisma } from '@prisma/client';
import { NextFunction } from 'express';
import { DoneCallback, Profile } from 'passport';
import { JwtService } from './jwt.service';

export class OAuthService {
  async callback(req: AppRequest, res: AppResponse, next: NextFunction) {
    if (!req?.user) throw new ForbiddenException('Forbidden resource.');
    console.log(req.user, 'USER');
    const generatedToken = await JwtService.sign({
      id: req.user?.id,
      email: req.user?.email,
    });

    const token = await prismaClient.token.create({
      data: {
        token: generatedToken,
        type: 'ACCESS_TOKEN',
        userId: req?.user?.id,
        codes: { create: { code: crypto.randomBytes(16).toString('hex') } },
      },
      include: { codes: { select: { code: true }, take: 1 } },
    });

    return res.redirect(
      `${process.env.CLIENT_URL}/oauth/callback?code=${token.codes?.[0]?.code}`
    );
  }

  verifyStrategy(providerType: $Enums.ProviderType) {
    return async function (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: DoneCallback
    ) {
      try {
        console.log(profile, 'Profile');
        let email = profile.emails?.[0]?.value;
        const displayName = profile?.displayName ?? '';

        if (!email)
          throw new OAuthVerifyException(
            `Can't get ${providerType?.toLowerCase()} account phone number or email address.`
          );

        const user = await prismaClient.user.findUnique({
          where: { identifier: email },
        });

        if (!user) {
          let uniqueUsername =
            profile?.username ??
            profile?.displayName?.split(' ')?.join('')?.toLowerCase() ??
            genUsername('');

          const usernameIsExists = await prismaClient.user.findUnique({
            where: { username: uniqueUsername },
          });

          if (usernameIsExists) {
            uniqueUsername += Date.now().toString();
          }

          const data: Prisma.UserCreateInput = {
            password: '',
            identifier: email,
            avatarUrl: profile.photos?.[0]?.value || undefined,
            username: uniqueUsername,
            fullName: displayName,
            providerType,
            isVerified: true,
            providerId: profile.id,
          };

          const newUser = await prismaClient.user.create({
            data,
          });

          return done(null, { email: newUser.identifier, id: newUser.id });
        }

        done(null, { email: user.identifier, id: user.id });
      } catch (err: any) {
        done(new OAuthVerifyException(err?.message), false);
      }
    };
  }
}
