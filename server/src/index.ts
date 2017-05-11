const express = require('express')
const bp = require('body-parser')
const mongoose = require('mongoose')
import { listJobs, createJob, updateJob, getJob } from "./controller/job";

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017');

mongoose.connection.on("error", () => {
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});

let app = express()
app.use(bp.json())

app.get('/', (req, rsp) => {
    rsp.send('api index')
})

app.get('/jobs/:id', getJob)
app.get('/jobs', listJobs)
app.post('/jobs', createJob)
app.put('/jobs', updateJob)

app.listen(8000, () => {
    console.log('server started on port 8000')
})

