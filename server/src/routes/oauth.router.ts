import { OAuthService } from '@app/services/oauth.service';
import { Handler } from '@app/utils/handler';
import { Router } from 'express';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const router = Router();

const signInUrl = process.env.BASE_CLIENT_URL + '/auth/sign-in';
const oauthService = new OAuthService();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      callbackURL: process.env.BASE_URL + '/api/v1/oauth/google/callback',
      scope: ['email', 'profile'],
    },
    oauthService.verifyStrategy('GOOGLE') as any
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID ?? '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
      callbackURL: process.env.BASE_URL + '/api/v1/oauth/facebook/callback',
      scope: ['email', 'public_profile'],
      profileFields: ['id', 'emails', 'name'],
    },
    oauthService.verifyStrategy('FACEBOOK')
  )
);

router.route('/google').get(
  passport.authenticate('google', {
    session: false,
    failureRedirect: signInUrl,
    scope: ['profile', 'email'],
  })
);
router.route('/google/callback').get(
  passport.authenticate('google', {
    session: false,
    failureRedirect: signInUrl,
  }),
  Handler.tryCatch(oauthService.callback)
);

router.route('/facebook').get(
  passport.authenticate('facebook', {
    session: false,
    failureRedirect: signInUrl,
    scope: ['email', 'public_profile'],
  })
);
router.route('/facebook/callback').get(
  passport.authenticate('facebook', {
    session: false,
    failureRedirect: signInUrl,
  }),
  Handler.tryCatch(oauthService.callback)
);

export default router;
