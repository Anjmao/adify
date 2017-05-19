import { JobService } from '../shared/services/job.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobModel } from "../shared/models/job.model";


@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor(
        private router: Router,
        private jobService: JobService,
    ) { }

    isAuthenticated: boolean;
    tags: Array<string> = [];
    tagsLoaded: boolean = false;

    jobs: JobModel[] = []

    ngOnInit() {
        this.jobService.getJobs().subscribe(rsp => this.jobs = rsp.jobs)
    }

}
