import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsModule } from './breadcrumbs/breadcrumbs.module';
import { CrudFormModule } from './crud-form/crud-form.module';
import { LoadOverlayModule } from './load-overlay/load-overlay.module';

@NgModule({
    imports: [
        CommonModule,
        BreadcrumbsModule,
        CrudFormModule,
        LoadOverlayModule
    ],
    exports: [
        BreadcrumbsModule,
        CrudFormModule,
        LoadOverlayModule
    ],
    declarations: []
})
export class BexModule { }
