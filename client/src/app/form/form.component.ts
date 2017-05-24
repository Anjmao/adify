import { AdService } from 'app/shared/services/ad.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdModel } from 'app/shared';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    adForm: FormGroup;
    error: any;
    ad: AdModel;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private adService: AdService
    ) { }

    ngOnInit() {
        this.adForm = this.fb.group({
            title: ['', Validators.required],
            body: ['', Validators.required]
        })

        this.route.data.subscribe(data => {
            if (data.ad) {
                this.ad = data.ad;
                this.adForm.patchValue(data.ad);
            }
        });
    }

    saveForm() {
        if (!this.adForm.valid) {
            this.adForm.controls['title'].markAsTouched();
            this.adForm.controls['body'].markAsTouched();
            return;
        }

        if (this.ad) {
            Object.assign(this.ad, this.adForm.value);
        } else {
            this.ad = this.adForm.value;
        }

        this.saveAd(this.ad).subscribe((rsp) => {
            if (rsp.error) {
                this.error = rsp.error;
            } else {
                this.router.navigateByUrl(`/ad/${rsp._id}`);
            }
        })
    }

    private saveAd(ad: AdModel): Observable<any> {
        if (ad._id) {
            return this.adService.updateAd(ad);
        }
        return this.adService.createAd(ad);
    }
}
