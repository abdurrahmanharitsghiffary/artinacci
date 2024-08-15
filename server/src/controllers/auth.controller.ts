import { prismaClient } from '@app/libs/prismaClient';
import { JwtService } from '@app/services/jwt.service';
import { SignInDto, SignOutDto, SignUpDto } from '@app/types/dto/auth/auth.dto';
import { AppRequest, AppResponse } from '@app/types/express';
import { Handler } from '@app/utils/handler';
import {
  BadRequestException,
  UnauthorizedException,
} from '@app/utils/http-exception';
import { HttpResponse } from '@app/utils/http-response';
import bcrypt from 'bcrypt';

export class AuthController extends Handler {
  async verifyCode(req: AppRequest, res: AppResponse) {
    const code = await prismaClient.code.findUnique({
      where: { code: req.body?.code },
      include: { token: { select: { userId: true, token: true } } },
    });

    if (!code || !code?.token)
      throw new UnauthorizedException('Invalid verification code.');

    return res
      .status(200)
      .json(new HttpResponse({ accessToken: code.token.token }, 200));
  }

  async signIn(req: AppRequest, res: AppResponse) {
    const { email, password } = req.body as SignInDto;

    const user = await prismaClient.user.findUnique({
      where: { identifier: email },
    });

    if (!user) throw new BadRequestException('Invalid credetials.');

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) throw new BadRequestException('Invalid credentials.');

    const accessToken = await JwtService.sign({
      id: user.id,
      email: user.identifier,
    });

    await prismaClient.token.create({
      data: { token: accessToken, type: 'ACCESS_TOKEN', userId: user.id },
    });

    return res.status(200).json(new HttpResponse({ accessToken }, 200));
  }

  async signUp(req: AppRequest, res: AppResponse) {
    const { email, fullName, password, username } = req.body as SignUpDto;

    const isUserExists = await prismaClient.user.count({
      where: { OR: [{ identifier: email }, { username }] },
    });

    if (isUserExists > 0)
      throw new BadRequestException('Username or email already exists.');

    const hashedPassword = await bcrypt.hash(
      password,
      +(process?.env?.SALT ?? 10)
    );

    const newUser = await prismaClient.user.create({
      data: {
        fullName,
        identifier: email,
        password: hashedPassword,
        username,
        membershipId: 1,
      },
    });

    const accessToken = await JwtService.sign({
      id: newUser.id,
      email: newUser.identifier,
    });

    await prismaClient.token.create({
      data: { token: accessToken, type: 'ACCESS_TOKEN', userId: newUser.id },
    });

    return res.status(200).json(new HttpResponse({ accessToken }, 200));
  }

  async revoke(req: AppRequest, res: AppResponse) {
    const { isLogoutFromAllDevice = false, token } = req.body as SignOutDto;

    if (!req?.user)
      throw new UnauthorizedException('You are not authenticated.');

    const user = await prismaClient.user.findUnique({
      where: { id: req?.user?.id },
    });

    if (isLogoutFromAllDevice) {
      await prismaClient.token.deleteMany({ where: { userId: user?.id } });
    } else {
      const accessToken = await prismaClient.token.findUnique({
        where: { token },
      });

      if (accessToken && accessToken.userId === req?.user?.id) {
        await prismaClient.token.delete({ where: { token } });
      }
    }

    return res.status(204).json(new HttpResponse(null, 204));
  }
}
