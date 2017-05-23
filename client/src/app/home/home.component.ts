import { AdService } from '../shared/services/ad.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdModel } from "../shared/models/ad.model";


@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor(
        private router: Router,
        private adService: AdService,
    ) { }

    isAuthenticated: boolean;
    tags: Array<string> = [];
    tagsLoaded: boolean = false;

    ads: AdModel[] = []

    ngOnInit() {
        this.adService.getAds().subscribe(rsp => this.ads = rsp.ads)
    }
}
