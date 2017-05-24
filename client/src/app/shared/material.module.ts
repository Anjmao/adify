import { MdButtonModule, MdCheckboxModule, MdCardModule, MdToolbarModule, MdListModule, MdInputModule } from '@angular/material';
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
    ],
    exports: [
        MdButtonModule,
        MdCheckboxModule,
        MdCardModule,
        MdToolbarModule,
        MdListModule,
        MdInputModule,
    ],
})
export class MaterialModule { }
