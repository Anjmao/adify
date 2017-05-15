import { MdButtonModule, MdCheckboxModule, MdCardModule, MdToolbarModule, MdListModule, MdIconModule } from '@angular/material';
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        MdButtonModule,
        MdCheckboxModule,
        BrowserAnimationsModule,
        MdCardModule,
        MdToolbarModule,
        MdListModule,
        MdIconModule,
    ],
    exports: [
        MdButtonModule,
        MdCheckboxModule,
        MdCardModule,
        MdToolbarModule,
        MdListModule,
        MdIconModule,
    ],
})
export class MaterialModule { }
