import * as express from 'express';
const bp = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
import { route as adRoutes } from './route/ad';
import { route as authRoutes } from './route/auth';
import { route as userRoutes } from './route/user';
import { createOrUpdateUser, User } from './model/user';
import { initializePassport, secureRoute } from './passport';
import { config } from './config';
import { Ad } from "./model/ad";

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoConnectionString);

console.log('env', process.env);
mongoose.connection.on('error', () => {
    console.log('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});

Ad.ensureIndexes();

/**
 * Initialize express
 */
const app = express()
app.use(bp.json())
app.use(initializePassport());
app.use(cors());

app.get('/', (req, rsp) => {
    rsp.json({ status: 'ok', user: req['user'] });
})

/**
 * Initialize routes
 */
app.use(authRoutes)
app.use(adRoutes)
app.use(userRoutes)


const server = app.listen(process.env.PORT || 8000, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
});

module.exports = app;

