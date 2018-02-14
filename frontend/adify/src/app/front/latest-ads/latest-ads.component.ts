import { Component, OnInit } from '@angular/core';
import { DataService, LatestAd } from "../../shared/services";

@Component({
    selector: 'latest-ads',
    templateUrl: './latest-ads.component.html',
    styleUrls: ['./latest-ads.component.scss']
})
export class LatestAdsComponent implements OnInit {

    latestAds: LatestAd[] = []

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
        this.dataService.getLatestAds().subscribe(rsp => {
            this.latestAds = rsp;
        })
    }

}
