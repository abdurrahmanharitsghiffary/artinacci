import { prismaClient } from '@app/libs/prismaClient';
import { UpgradePlanDto } from '@app/types/dto/plans/upgrade-plan.dto';
import { membershipType } from '@app/types/enums/membership-type';
import { AppRequest, AppResponse } from '@app/types/express';
import { Handler } from '@app/utils/handler';
import { HttpResponse } from '@app/utils/http-response';

export class MeController extends Handler {
  async getProfile(req: AppRequest, res: AppResponse) {
    const myProfile = await prismaClient.user.findUnique({
      where: { id: req?.user?.id },
      select: {
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
        fullName: true,
        id: true,
        identifier: true,
        isVerified: true,
        membership: true,
        role: true,
        username: true,
      },
    });

    return res.status(200).json(new HttpResponse(myProfile, 200));
  }

  async upgradePlan(req: AppRequest, res: AppResponse) {
    const { planType } = req.body as UpgradePlanDto;
    console.log(req.body, 'Type Plan');
    const user = await prismaClient.user.findUnique({
      where: { id: req?.user?.id },
      include: { membership: { select: { type: true } } },
    });

    // if (user?.membership?.type === planType)
    //   throw new BadRequestException(`You already have ${planType} plan.`);

    // if (
    //   membershipType[user?.membership?.type ?? 'A'] > membershipType[planType]
    // )
    //   throw new BadRequestException('Cannot upgrade to lower plan.');
    console.log(user, 'USer');
    console;
    console.log(membershipType[planType], 'Plan Type');
    await prismaClient.user.update({
      data: { membershipId: membershipType[planType] },
      where: { id: user?.id },
    });

    return res
      .status(200)
      .json(new HttpResponse(null, 200, 'Plan successfully upgraded.'));
  }
}
