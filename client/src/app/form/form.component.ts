import { JobService } from 'app/shared/services/job.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    jobForm: FormGroup;

    constructor(private fb: FormBuilder, private jobService: JobService) { }

    ngOnInit() {
        this.jobForm = this.fb.group({
            title: '',
            body: ''
        })
    }

    saveForm() {
        console.log(this.jobForm.value)

        this.jobService.createJob(this.jobForm.value).subscribe((rsp) => {
            console.log(rsp)
        })
    }
}
