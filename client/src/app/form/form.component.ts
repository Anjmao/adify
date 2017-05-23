import { AdService } from 'app/shared/services/ad.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    adForm: FormGroup;

    constructor(private fb: FormBuilder, private adService: AdService) { }

    ngOnInit() {
        this.adForm = this.fb.group({
            title: '',
            body: ''
        })
    }

    saveForm() {
        console.log(this.adForm.value)

        this.adService.createAd(this.adForm.value).subscribe((rsp) => {
            console.log(rsp)
        })
    }
}
