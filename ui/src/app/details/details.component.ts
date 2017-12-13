import { AdModel, UserModel, UserService } from '../shared';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    ) {
        userService.currentUser.subscribe(u => this.user = u);
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.ad = data.ad;
        });
    }
}
