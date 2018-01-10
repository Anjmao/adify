import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DetailsComponent } from './details/details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BexModule } from '../../bex/bex.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AdsComponent } from './ads.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BexModule,
        NgxDatatableModule,
        SharedModule,
        RouterModule
    ],
    declarations: [DetailsComponent, AdsComponent]
})
export class AdsModule { }
