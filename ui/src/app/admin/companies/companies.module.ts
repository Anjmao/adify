import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DetailsComponent } from './details/details.component';
import { CompaniesComponent } from './companies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BexModule } from '../../bex/bex.module';
import { CompaniesRoutingModule } from './companies-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BexModule,
        NgxDatatableModule,
        CompaniesRoutingModule
    ],
    declarations: [DetailsComponent, CompaniesComponent]
})
export class CompaniesModule { }
