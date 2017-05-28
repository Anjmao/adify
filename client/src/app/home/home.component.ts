import { AdService } from '../shared/services/ad.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdModel, ListAdsRequest } from '../shared/models/ad.model';


@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    ads: AdModel[] = [];
    filter: ListAdsRequest = {};

    constructor(
        private router: Router,
        private adService: AdService,
    ) { }

    ngOnInit() {
        this.loadAds();
    }

    search(value: string) {
        this.filter.search = value;
        this.loadAds();
    }

    private loadAds() {
        this.adService.getAds(this.filter).subscribe(rsp => this.ads = rsp.ads)
    }
}
