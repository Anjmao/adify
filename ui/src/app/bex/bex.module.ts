import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsModule } from './breadcrumbs/breadcrumbs.module';
import { CrudFormModule } from './crud-form/crud-form.module';

@NgModule({
    imports: [
        CommonModule,
        BreadcrumbsModule,
        CrudFormModule
    ],
    exports: [
        BreadcrumbsModule,
        CrudFormModule
    ],
    declarations: []
})
export class BexModule { }
