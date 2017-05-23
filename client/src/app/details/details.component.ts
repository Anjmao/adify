import { AdModel } from 'app/shared/models/ad.model';
import { ApiService } from 'app/shared/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AdService } from "app/shared/services/ad.service";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

    ad: AdModel;

    constructor(
        private route: ActivatedRoute,
        private adService: AdService,
    ) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.ad = data.ad;
        });
    }
}
