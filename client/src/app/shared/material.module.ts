import { MdButtonModule, MdCheckboxModule, MdCardModule, MdToolbarModule, MdListModule, MdIconModule, MdInputModule } from '@angular/material';
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
        MdInputModule,
    ],
    exports: [
        MdButtonModule,
        MdCheckboxModule,
        MdCardModule,
        MdToolbarModule,
        MdListModule,
        MdIconModule,
        MdInputModule,
    ],
})
export class MaterialModule { }
