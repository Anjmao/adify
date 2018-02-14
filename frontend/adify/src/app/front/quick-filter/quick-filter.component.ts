import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'quick-filter',
    templateUrl: './quick-filter.component.html',
    styleUrls: ['./quick-filter.component.scss']
})
export class QuickFilterComponent implements OnInit {

    filter = {
        place: null,
        date: null
    };

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    search() {
        this.router.navigate(['/ads'], { queryParams: this.filter });
    }

}
