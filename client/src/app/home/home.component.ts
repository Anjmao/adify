import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../shared/models/user.model';
import { AdService } from '../shared/services/ad.service';
import { Component, OnInit } from '@angular/core';
import { AdModel, ListAdsRequest } from '../shared/models/ad.model';
import { UserService } from "app/shared";


@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    isAuthenticated = false;

    constructor(
        route: ActivatedRoute,
        userService: UserService,
    ) {
        userService.isAuthenticated.subscribe((val) => {
            this.isAuthenticated = val;
        });
    }

    ngOnInit() { }

}
