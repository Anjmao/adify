import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdDetailsComponent } from './ad-details.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AdDetailsComponent
    ],
    exports: [
        AdDetailsComponent
    ]
})
export class AdDetailsModule {
}
