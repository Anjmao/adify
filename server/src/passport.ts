import { config } from './config';
import { createOrUpdateUser } from './model/user';
import { RequestHandler } from 'express';
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jwt-simple');

export function secureRoute(method = 'jwt'): RequestHandler {
    return passport.authenticate(method, { session: false });
}

export function initializePassport(): RequestHandler {
    /**
     * Setup JWT
     */
    const opts: any = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.jwtSecret;
    opts.expiresIn = 2
    // opts.issuer = 'locahost:8000';
    // opts.audience = 'localhost:4200';
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        console.log('jwt', jwt_payload)
        done(null, jwt_payload)
    }));


    /**
     * Setup Linkedin passport
     */
    passport.use(new LinkedInStrategy({
        clientID: '86ssz1ba3pxqwe',
        clientSecret: '3QzLmAOmZgmh5AhO',
        callbackURL: 'http://localhost:8000/auth/linkedin/callback',
        scope: ['r_emailaddress', 'r_basicprofile'],
    },
        (token, tokenSecret, profile, done) => {
            console.log('linkedin', profile);
            createOrUpdateUser(profile).then((user) => {
                (<any>user)._token = jwt.encode(user, config.jwtSecret)
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
        clientID: '1208262602617328',
        clientSecret: 'ea445901429395027822ec6d7a62250f',
        callbackURL: 'http://localhost:8000/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'email', 'photos']
    },
        (token, refreshToken, profile, done) => {
            console.log('facebook', profile);
            createOrUpdateUser(profile).then((user) => {
                (<any>user)._token = jwt.encode(user, config.jwtSecret)
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
        clientID: '428272099029-i07snjroc6ib1so1hgoj17it05do7cbb.apps.googleusercontent.com',
        clientSecret: 'auds0fYeCI3JVvap4idXg-sa',
        callbackURL: 'http://localhost:8000/auth/google/callback'
    },
        (token, refreshToken, profile, done) => {
            console.log('google', profile);
            createOrUpdateUser(profile).then((user) => {
                (<any>user)._token = jwt.encode(user, config.jwtSecret)
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


