import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsModule } from './breadcrumbs/breadcrumbs.module';

@NgModule({
    imports: [
        CommonModule,
        BreadcrumbsModule
    ],
    exports: [
        BreadcrumbsModule
    ],
    declarations: []
})
export class BexModule { }
