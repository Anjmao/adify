import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsViewComponent } from './details-view/details-view.component';
import { BexModule } from '../../bex/bex.module';

@NgModule({
    imports: [
        CommonModule,
        BexModule
    ],
    declarations: [DetailsViewComponent],
    exports: [DetailsViewComponent]
})
export class SharedModule { }
