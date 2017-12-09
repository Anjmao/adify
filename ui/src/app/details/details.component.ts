import { AdModel, UserModel, AdService, UserService } from 'app/shared';
import { ApiService } from 'app/shared/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

    ad: AdModel;
    user: UserModel;

    constructor(
        userService: UserService,
        private route: ActivatedRoute,
        private adService: AdService,
    ) {
        userService.currentUser.subscribe(u => this.user = u);
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.ad = data.ad;
        });
    }
}
