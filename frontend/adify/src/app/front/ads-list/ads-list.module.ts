import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideFilterComponent } from "./side-filter/side-filter.component";
import { AdsListComponent } from "./ads-list.component";
import { TopFilterComponent } from "./top-filter/top-filter.component";
import { RouterModule } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgSelectModule
    ],
    declarations: [
        AdsListComponent,
        SideFilterComponent,
        TopFilterComponent,
    ],
    exports: [
        AdsListComponent
    ]
})
export class AdsListModule {
}
