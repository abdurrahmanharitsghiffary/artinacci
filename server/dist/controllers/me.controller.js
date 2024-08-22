"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeController = void 0;
const prismaClient_1 = require("@app/libs/prismaClient");
const membership_type_1 = require("@app/types/enums/membership-type");
const handler_1 = require("@app/utils/handler");
const http_response_1 = require("@app/utils/http-response");
class MeController extends handler_1.Handler {
    async getProfile(req, res) {
        const myProfile = await prismaClient_1.prismaClient.user.findUnique({
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
        return res.status(200).json(new http_response_1.HttpResponse(myProfile, 200));
    }
    async upgradePlan(req, res) {
        const { planType } = req.body;
        console.log(req.body, 'Type Plan');
        const user = await prismaClient_1.prismaClient.user.findUnique({
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
        console.log(membership_type_1.membershipType[planType], 'Plan Type');
        await prismaClient_1.prismaClient.user.update({
            data: { membershipId: membership_type_1.membershipType[planType] },
            where: { id: user?.id },
        });
        return res
            .status(200)
            .json(new http_response_1.HttpResponse(null, 200, 'Plan successfully upgraded.'));
    }
}
exports.MeController = MeController;
