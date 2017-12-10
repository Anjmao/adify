import { trigger, state, animate, style, transition } from '@angular/core';

export function routerDetailsTransition() {
    return slideToLeft();
}

function slideToLeft() {
    return trigger('routerDetailsTransition', [
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
