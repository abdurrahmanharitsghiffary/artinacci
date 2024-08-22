"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthService = void 0;
const prismaClient_1 = require("@app/libs/prismaClient");
const gen_username_1 = require("@app/utils/gen-username");
const crypto_1 = __importDefault(require("crypto"));
const http_exception_1 = require("@app/utils/http-exception");
const jwt_service_1 = require("./jwt.service");
class OAuthService {
    async callback(req, res, next) {
        if (!req?.user)
            throw new http_exception_1.ForbiddenException('Forbidden resource.');
        console.log(req.user, 'USER');
        const generatedToken = await jwt_service_1.JwtService.sign({
            id: req.user?.id,
            email: req.user?.email,
        });
        const token = await prismaClient_1.prismaClient.token.create({
            data: {
                token: generatedToken,
                type: 'ACCESS_TOKEN',
                userId: req?.user?.id,
                codes: { create: { code: crypto_1.default.randomBytes(16).toString('hex') } },
            },
            include: { codes: { select: { code: true }, take: 1 } },
        });
        return res.redirect(`${process.env.CLIENT_URL}/oauth/callback?code=${token.codes?.[0]?.code}`);
    }
    verifyStrategy(providerType) {
        return async function (accessToken, refreshToken, profile, done) {
            try {
                console.log(profile, 'Profile');
                let email = profile.emails?.[0]?.value;
                let displayName = profile?.displayName ?? '';
                if (providerType === 'FACEBOOK') {
                    const givenName = profile?.name?.givenName ?? '';
                    const familyName = profile?.name?.familyName ?? '';
                    const middleName = profile?.name?.middleName ?? '';
                    displayName = givenName;
                    if (middleName)
                        displayName += ' ' + middleName;
                    if (familyName)
                        displayName += ' ' + familyName;
                }
                if (!email)
                    throw new http_exception_1.OAuthVerifyException(`Can't get ${providerType?.toLowerCase()} account phone number or email address.`);
                const user = await prismaClient_1.prismaClient.user.findUnique({
                    where: { identifier: email },
                });
                if (!user) {
                    let uniqueUsername = profile?.username ??
                        profile?.displayName?.split(' ')?.join('')?.toLowerCase() ??
                        (0, gen_username_1.genUsername)('');
                    const usernameIsExists = await prismaClient_1.prismaClient.user.findUnique({
                        where: { username: uniqueUsername },
                    });
                    if (usernameIsExists) {
                        uniqueUsername += Date.now().toString();
                    }
                    const data = {
                        password: '',
                        identifier: email,
                        avatarUrl: profile.photos?.[0]?.value || undefined,
                        username: uniqueUsername,
                        fullName: displayName,
                        providerType,
                        isVerified: true,
                        providerId: profile.id,
                    };
                    const newUser = await prismaClient_1.prismaClient.user.create({
                        data,
                    });
                    return done(null, { email: newUser.identifier, id: newUser.id });
                }
                done(null, { email: user.identifier, id: user.id });
            }
            catch (err) {
                done(new http_exception_1.OAuthVerifyException(err?.message), false);
            }
        };
    }
}
exports.OAuthService = OAuthService;
