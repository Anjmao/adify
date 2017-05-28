import { AdModel } from 'app/shared/models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ads-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    @Input() ads: AdModel[]

    constructor() { }

    ngOnInit() {
    }

}
