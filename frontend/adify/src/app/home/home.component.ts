import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared';
import { FilterService } from './filter.service';


@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    isAuthenticated = false;

    cities = [];

    constructor(
        _: ActivatedRoute,
        userService: UserService,
        private filterService: FilterService
    ) {
        userService.isAuthenticated.subscribe((val) => {
            this.isAuthenticated = val;
        });
    }

    ngOnInit() {
        this.filterService.getCities().subscribe(x => {
            this.cities = x;
        });
    }

}
