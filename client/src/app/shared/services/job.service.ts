import { ApiService } from './';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { JobModel, ListJobsResponse } from "app/shared/models/job.model";

@Injectable()
export class JobService {

    constructor(private apiService: ApiService) { }

    getJobs(): Observable<ListJobsResponse> {
        return this.apiService.get('/jobs');
    }

    getJob(id: string): Observable<JobModel> {
        return this.apiService.get(`/jobs/${id}`);
    }

    createJob(job: JobModel): Observable<any> {
        return this.apiService.post('/jobs', job);
    }
}
