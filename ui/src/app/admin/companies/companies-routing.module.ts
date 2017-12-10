import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { CompaniesComponent } from './companies.component';

const routes: Routes = [
    {
        path: '',
        component: CompaniesComponent,
        children: [
            { path: 'details/:id', component: DetailsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompaniesRoutingModule { }
