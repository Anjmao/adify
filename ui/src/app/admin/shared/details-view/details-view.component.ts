import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { routerDetailsTransition } from '../../animations/route-details';

@Component({
    selector: 'app-details-view',
    templateUrl: './details-view.component.html',
    styleUrls: ['./details-view.component.scss'],
    animations: [routerDetailsTransition()],
    // tslint:disable-next-line:use-host-property-decorator
    host: { '[@routerDetailsTransition]': '' }
})
export class DetailsViewComponent implements OnInit {

    @Input() loading: boolean;
    @Output() close = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    closeDetails($e) {
        this.close.emit($e);
    }

}
