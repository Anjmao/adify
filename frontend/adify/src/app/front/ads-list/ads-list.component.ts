import { Component, OnInit } from '@angular/core';
import { DataService } from "../../shared/services";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { AdModel } from "../../shared/models";

@Component({
    selector: 'ads-list',
    templateUrl: './ads-list.component.html',
    styleUrls: ['./ads-list.component.scss']
})
export class AdsListComponent implements OnInit {

    ads: AdModel[] = [];
    totalCount = 0;

    constructor(private dataService: DataService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.pipe(
            switchMap(params => this.dataService.getAds(params))
        ).subscribe(rsp => {
            this.ads = rsp.result;
            this.totalCount = rsp.totalCount;
        });
    }

}
