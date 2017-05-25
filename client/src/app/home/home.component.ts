import { AdService } from '../shared/services/ad.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdModel } from '../shared/models/ad.model';


@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    ads: AdModel[] = []

    constructor(
        private router: Router,
        private adService: AdService,
    ) { }


    ngOnInit() {
        this.adService.getAds().subscribe(rsp => this.ads = rsp.ads)
    }
}
