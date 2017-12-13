import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, animate, style, transition } from '@angular/core';

export function slideToLeftTransition() {
    return slideToLeft();
}

function slideToLeft() {
    return trigger('slideToLeftTransition', [
        state('void', style({ position: 'absolute', width: '80%' })),
        state('*', style({ position: 'absolute', width: '80%' })),
        transition(':enter', [  // before 2.1: transition('void => *', [
            style({ transform: 'translateX(100%)' }),
            animate('0.2s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [  // before 2.1: transition('* => void', [
            style({ transform: 'translateX(0%)' }),
            animate('0.2s ease-in-out', style({ transform: 'translateX(100%)' }))
        ])
    ]);
}


@Component({
    selector: 'app-details-view',
    templateUrl: './details-view.component.html',
    styleUrls: ['./details-view.component.scss'],
    animations: [slideToLeftTransition()],
    // tslint:disable-next-line:use-host-property-decorator
    host: { '[@slideToLeftTransition]': '' }
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
