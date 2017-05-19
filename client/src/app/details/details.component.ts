import { JobModel } from 'app/shared/models/job.model';
import { ApiService } from 'app/shared/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { JobService } from "app/shared/services/job.service";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

    job: JobModel;

    constructor(
        private route: ActivatedRoute,
        private jobService: JobService,
    ) { }

    ngOnInit() {
        this.jobService.getJob(this.route.snapshot.params['id']).subscribe(job => this.job = job)
    }

}
