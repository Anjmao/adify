import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsViewComponent } from './details-view/details-view.component';
import { LoadOverlayComponent } from './load-overlay/load-overlay.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [DetailsViewComponent, LoadOverlayComponent],
    exports: [DetailsViewComponent, LoadOverlayComponent]
})
export class SharedModule { }
