import {
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdToolbarModule,
    MdListModule,
    MdInputModule,
    MdMenuModule,
} from '@angular/material';
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
        MdInputModule,
        MdMenuModule,
    ],
    exports: [
        MdButtonModule,
        MdCheckboxModule,
        MdCardModule,
        MdToolbarModule,
        MdListModule,
        MdInputModule,
        MdMenuModule,
    ],
})
export class MaterialModule { }
