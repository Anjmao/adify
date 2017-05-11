import { Request, Response, NextFunction } from 'express'
import { JobModel, Job } from "../model/job";

interface ListJobsResponse {
    jobs: JobModel[]
}


export function listJobs(req: Request, rsp: Response, next: NextFunction) {
    Job.find().then(jobs => {
        let jobsList: ListJobsResponse = {
            jobs: jobs
        }
        rsp.json(jobsList)
    }).catch(err => {
        next(err)
    })
}

export function getJob(req: Request, rsp: Response, next: NextFunction) {
    Job.findById(req.params['id'], (err, job) => {
        if (err) {
            return rsp.json(err)
        } else {
            if (job) {
                return rsp.json(job)
            } else {
                rsp.status(404)
                return rsp.json({ error: `job ${req.params['id']} not found` })
            }
        }
    })
}

export function createJob(req: Request, rsp: Response, next: NextFunction) {
    let job = new Job(req.body)

    job.save((err, savedJob) => {
        if (err) {
            rsp.status(400)
            rsp.json(err.errors)
        } else {
            rsp.json(savedJob)
        }
    })
}

export function updateJob(req: Request, rsp: Response, next: NextFunction) {
    let j = <JobModel>req.body
    Job.findById(j._id, (err, job) => {
        if (err) {
            return rsp.json(err)
        }

        job.title = j.title;
        job.body = j.body;
        job.save((err, savedJob) => {
            if (err) {
                rsp.status(400)
                rsp.json(err.errors)
            } else {
                rsp.json(savedJob)
            }
        })
    })
}
