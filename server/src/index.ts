import * as express from 'express';
const bp = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const LinkedInStrategy = require('passport-linkedin').Strategy;
const MongoStore = require('connect-mongo')(session);

import { listJobs, createJob, updateJob, getJob } from "./controller/job";
import { getUser } from "./controller/user";
import { createOrUpdateUser } from "./model/user";

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
    consumerKey: '86ssz1ba3pxqwe',
    consumerSecret: '3QzLmAOmZgmh5AhO',
    callbackURL: "http://localhost:8000/auth/linkedin/callback"
},
    (token, tokenSecret, profile, done) => {
        createOrUpdateUser(profile, tokenSecret, () => {
            done(null, profile)
        }, () => {
            done(null, profile)
            console.log('error while create user', profile)
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
 * Initialize express
 */
let app = express()
app.use(bp.json())
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'session sec',
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, rsp) => {
    rsp.json({
        user: req['user']
    })
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
app.get('/user', getUser)

/**
 * Auth routes
 */
app.get('/auth/linkedin',
    passport.authenticate('linkedin'),
    function (req, res) {
        // The request will be redirected to LinkedIn for authentication, so this
        // function will not be called.
    });

app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });

app.get('/logout', function (req, res) {
    (<any>req).logout();
    res.redirect('/');
});

app.listen(8000, () => {
    console.log('server started on port 8000')
})

