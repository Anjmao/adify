import { Component, OnInit } from '@angular/core';

//import { UserModel } from '../models';
import { UserService } from '../services';

@Component({
    selector: 'layout-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    constructor(
        private userService: UserService
    ) { }

    currentUser: any;

    ngOnInit() {
        this.userService.currentUser.subscribe(
            (userData) => {
                this.currentUser = userData;
            }
        )
    }

    logout() {
        this.userService.logout().subscribe();
    }
}
