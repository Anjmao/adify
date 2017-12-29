import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { AdsComponent } from './ads/ads.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'users', component: UsersComponent, data: { title: 'Users' } },
            { path: 'ads', component: AdsComponent, data: { title: 'Ads' } },
            { path: 'companies', loadChildren: './companies/companies.module#CompaniesModule', data: { title: 'Companies' } },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
