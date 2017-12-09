import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../shared/models/user.model';
import { AdService } from '../shared/services/ad.service';
import { Component, OnInit } from '@angular/core';
import { AdModel, ListAdsRequest } from '../shared/models/ad.model';
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
        route: ActivatedRoute,
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
