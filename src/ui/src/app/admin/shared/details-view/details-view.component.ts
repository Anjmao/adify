import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, animate, style, transition } from '@angular/core';

export function slideToLeft() {
    return trigger('slideToLeftTransition', [
        state('void', style({ position: 'absolute', width: '80%' })),
        state('*', style({ position: 'absolute', width: '80%' })),
        transition(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.2s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.2s ease-in-out', style({ transform: 'translateX(100%)' }))
        ])
    ]);
}

export function slideToLeftTransition() {
    return slideToLeft();
}

@Component({
    selector: 'app-details-view',
    templateUrl: './details-view.component.html',
    styleUrls: ['./details-view.component.scss'],
    animations: [slideToLeftTransition()],
    host: {
        '[@slideToLeftTransition]': ''
    }
})
export class DetailsViewComponent implements OnInit {

    @Input() loading: boolean;
    @Output() close = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    closeDetails($event) {
        $event.preventDefault();
        this.close.emit();
    }
}
