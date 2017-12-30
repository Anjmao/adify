import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { BexModule } from '../bex/bex.module';
import { SharedModule } from '../shared/shared.module';
import { CompaniesModule } from './companies/companies.module';
import { AdsModule } from './ads/ads.module';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        BexModule,
        ReactiveFormsModule,
        SharedModule,
        CompaniesModule,
        AdsModule
    ],
    declarations: [
        DashboardComponent,
        AdminComponent,
        SidebarComponent,
        UsersComponent,
        LoginComponent
    ]
})
export class AdminModule { }
