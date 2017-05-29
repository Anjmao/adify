import { AdModel } from 'app/shared/models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from "app/shared";

@Component({
    selector: 'ads-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    @Input() ads: AdModel[]
    @Output() onSearch = new EventEmitter();
    @Output() onDelete = new EventEmitter();
    userId: string;

    constructor(userService: UserService) {
        userService.currentUser.subscribe(u => {
            this.userId = u._id;
        });
    }

    ngOnInit() {

    }

    search($event) {
        this.onSearch.emit($event.target.value);
    }

    deleteAd(ad: AdModel) {
        this.onDelete.emit(ad);
    }

}
