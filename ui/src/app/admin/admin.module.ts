import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersComponent } from './users/users.component';
import { AdsComponent } from './ads/ads.component';
import { CompaniesComponent } from './companies/companies.component';
import { LoginComponent } from './login/login.component';
import { BexModule } from '../bex/bex.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        BexModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        SharedModule
    ],
    declarations: [
        DashboardComponent,
        AdminComponent,
        SidebarComponent,
        UsersComponent,
        AdsComponent,
        CompaniesComponent,
        LoginComponent
    ]
})
export class AdminModule { }
