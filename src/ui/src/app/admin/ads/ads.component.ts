import { Component, OnInit } from '@angular/core';
import { DataService, AdModel } from '../../shared/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-ads',
    templateUrl: './ads.component.html',
    styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {

    constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {
    }

    rows: AdModel[] = [];
    selected = [];
    loadingIndicator = true;
    reorderable = true;

    columns = [
        { prop: 'id', name: 'Id' },
        { prop: 'title', name: 'Title' },
        { prop: 'cityIds', name: 'City' },
    ];

    ngOnInit() {
        this.dataService.getAds().subscribe(rows => {
            this.rows = rows;
            this.loadingIndicator = false;
        });
    }

    createNew() {
        this.router.navigate(['details', 0], { relativeTo: this.route });
    }

    onSelect($e) {
        const ad: AdModel = $e.selected[0];
        this.router.navigate(['details', ad.id], { relativeTo: this.route });
    }

}
