"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oauth_service_1 = require("@app/services/oauth.service");
const handler_1 = require("@app/utils/handler");
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const router = (0, express_1.Router)();
const signInUrl = process.env.BASE_CLIENT_URL + '/auth/sign-in';
const oauthService = new oauth_service_1.OAuthService();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    callbackURL: process.env.BASE_URL + '/api/v1/oauth/google/callback',
    scope: ['email', 'profile'],
}, oauthService.verifyStrategy('GOOGLE')));
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID ?? '',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
    callbackURL: process.env.BASE_URL + '/api/v1/oauth/facebook/callback',
    scope: ['email', 'public_profile'],
    profileFields: ['id', 'emails', 'name'],
}, oauthService.verifyStrategy('FACEBOOK')));
router.route('/google').get(passport_1.default.authenticate('google', {
    session: false,
    failureRedirect: signInUrl,
    scope: ['profile', 'email'],
}));
router.route('/google/callback').get(passport_1.default.authenticate('google', {
    session: false,
    failureRedirect: signInUrl,
}), handler_1.Handler.tryCatch(oauthService.callback));
router.route('/facebook').get(passport_1.default.authenticate('facebook', {
    session: false,
    failureRedirect: signInUrl,
    scope: ['email', 'public_profile'],
}));
router.route('/facebook/callback').get(passport_1.default.authenticate('facebook', {
    session: false,
    failureRedirect: signInUrl,
}), handler_1.Handler.tryCatch(oauthService.callback));
exports.default = router;
