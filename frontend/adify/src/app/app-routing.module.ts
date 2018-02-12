import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";

const routes: Routes = [
    { path: '', redirectTo: 'home', data: { title: 'Home' }, pathMatch: 'full' },
    { path: 'logic', component: LoginComponent },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    // { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
