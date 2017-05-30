import { config } from './config';
import { createOrUpdateUser, UserModel } from './model/user';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { AppRequest } from "./model/request";
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

export function secureRoute(method = 'jwt'): RequestHandler {
    return passport.authenticate(method, { session: false });
}

/**
 * Use to extract jwt auth token to access req.user in public routes
 */
export function publicRoute(): RequestHandler {
    return (req: AppRequest, rsp: Response, next: NextFunction) => {
        req.user = {};
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, config.jwtSecret, (err, decoded) => {
                if (!err) {
                    req.user = { id: decoded.id, email: decoded.email };
                }
                next();
            });
        } else {
            next();
        }
    }
}

export function initializePassport(): RequestHandler {
    /**
     * Setup JWT
     */
    const opts: any = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.jwtSecret;
    opts.expiresIn = "14d"
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        done(null, jwt_payload)
    }));


    /**
     * Setup Linkedin passport
     */
    passport.use(new LinkedInStrategy({
        clientID: config.linkedin.clientID,
        clientSecret: config.linkedin.clientSecret,
        callbackURL: `${config.baseUrl}/auth/linkedin/callback`,
        scope: ['r_emailaddress', 'r_basicprofile'],
    },
        (token, tokenSecret, profile, done) => {
            console.log('linkedin', profile);
            createOrUpdateUser(profile).then((user) => {
                (<any>user)._token = signToken(user)
                done(null, user)
            }).catch((err) => {
                console.log(err)
                done(null, false)
            })
        }
    ));

    /**
     * Setup Facebook passport
     */
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: `${config.baseUrl}/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'email', 'photos']
    },
        (token, refreshToken, profile, done) => {
            console.log('facebook', profile);
            createOrUpdateUser(profile).then((user) => {
                (<any>user)._token = signToken(user)
                done(null, user)
            }).catch((err) => {
                console.log(err)
                done(null, false)
            });
        }
    ));

    /**
     * Setup Google passport
     */

    passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: `${config.baseUrl}/auth/google/callback`
    },
        (token, refreshToken, profile, done) => {
            console.log('google', profile);
            createOrUpdateUser(profile).then((user) => {
                (<any>user)._token = signToken(user)
                done(null, user)
            }).catch((err) => {
                console.log(err)
                done(null, false)
            });
        }
    ));

    passport.serializeUser((user, cb) => {
        console.log('serialize user', user)
        cb(null, user);
    });

    passport.deserializeUser((obj, cb) => {
        console.log('deserialize user', obj)
        cb(null, obj);
    });

    return passport.initialize();
}

function signToken(user: UserModel): string {
    return jwt.sign({ id: user._id, email: user.email }, config.jwtSecret);
}
