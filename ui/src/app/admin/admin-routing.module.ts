import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { AdsComponent } from './ads/ads.component';
import { CompaniesComponent } from './companies/companies.component';
import { DetailsComponent as CompaniesDetailsComponent } from './companies/details/details.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'users', component: UsersComponent, data: { title: 'Users' } },
            { path: 'ads', component: AdsComponent, data: { title: 'Ads' } },
            {
                path: 'companies',
                component: CompaniesComponent,
                // loadChildren: './companies/companies.module#CompaniesModule', data: { title: 'Companies' }
                children: [
                    { path: 'details/:id', component: CompaniesDetailsComponent }
                ]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
