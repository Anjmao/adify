import { AdModel } from 'app/shared/models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ads-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    @Input() ads: AdModel[]
    @Output('onSearch') onSearch = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    search($event) {
        this.onSearch.emit($event.target.value)
    }

}
