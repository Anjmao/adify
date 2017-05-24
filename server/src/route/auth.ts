import { Request, Response, Router } from 'express'
import { createOrUpdateUser } from '../model/user';
import { config } from '../config';
const passport = require('passport');

export const route = Router();

route.get('/auth/linkedin', passport.authenticate('linkedin', { session: false }));
route.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    redirectToComplete);

route.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'], session: false }));
route.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    redirectToComplete);

route.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
route.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    redirectToComplete);

function redirectToComplete(req: Request, rsp: Response) {
    rsp.redirect(`${config.uiBaseUrl}/login/complete/${req['user']._token}`);
}
