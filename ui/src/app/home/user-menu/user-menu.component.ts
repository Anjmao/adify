import { UserModel } from 'app/shared/models';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "app/shared";

@Component({
    selector: 'user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

    user: UserModel;
    constructor(userService: UserService) {
        userService.currentUser.subscribe(u => this.user = u);
    }

    ngOnInit() {
    }

}
