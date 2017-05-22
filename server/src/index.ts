import * as express from 'express';
const bp = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const cors = require('cors');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jwt-simple');
import { listJobs, createJob, updateJob, getJob } from "./controller/job";
import { getUser } from "./controller/user";
import { createOrUpdateUser, User } from "./model/user";

const jwtSecret = 'lol'

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017');

mongoose.connection.on("error", () => {
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});

/**
 * Setup linked in passport
 */
passport.use(new LinkedInStrategy({
    clientID: '86ssz1ba3pxqwe',
    clientSecret: '3QzLmAOmZgmh5AhO',
    callbackURL: "http://localhost:8000/auth/linkedin/callback"
},
    (token, tokenSecret, profile, done) => {
        createOrUpdateUser(profile).then((user) => {
            (<any>user)._token = jwt.encode(user, jwtSecret)
            done(null, user)
        }).catch((err) => {
            console.log(err)
            done(null, false)
        })
    }
));

passport.use(new FacebookStrategy({
    clientID: '1208262602617328',
    clientSecret: 'ea445901429395027822ec6d7a62250f',
    callbackURL: "http://localhost:8000/auth/facebook/callback"
},
    (token, refreshToken, profile, done) => {
        createOrUpdateUser(profile).then((user) => {
            (<any>user)._token = jwt.encode(user, jwtSecret)
            done(null, user)
        }).catch((err) => {
            console.log(err)
            done(null, false)
        })
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

/**
 * Setup JWT
 */

var opts: any = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = jwtSecret;
//opts.issuer = "locahost:8000";
//opts.audience = "localhost:4200";
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log('jwt', jwt_payload)
    done(null, jwt_payload)
}));

/**
 * Initialize express
 */
let app = express()
app.use(bp.json())
app.use(passport.initialize());
//app.use(passport.session());
app.use(cors());

app.get('/', (req, rsp) => {
    rsp.send('aa')
})

/**
 * Jobs routes
 */
app.get('/jobs/:id', getJob)
app.get('/jobs', listJobs)
app.post('/jobs', createJob)
app.put('/jobs', updateJob)

/**
 * User routes
 */
//app.get('/user', getUser)

app.get('/user', passport.authenticate('jwt', { session: false }),
    (req: any, res) => {
        res.send(req.user);
    }
);

/**
 * Auth routes
 */
app.get('/auth/linkedin',
    passport.authenticate('linkedin', { session: false }));

app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect(`http://localhost:4200/login/complete/${req['user']._token}`);
    });

app.get('/auth/facebook', passport.authenticate('facebook', { session: false }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect(`http://localhost:4200/login/complete/${req['user']._token}`);
    });


app.get('/token', (req, res) => {
    return res.json({
        token: jwt.encode({ user: 'test' }, jwtSecret)
    })
})

app.get('/logout', (req, res) => {
    (<any>req).logout();
    res.json({})
});

app.listen(8000, () => {
    console.log('server started on port 8000')
})

