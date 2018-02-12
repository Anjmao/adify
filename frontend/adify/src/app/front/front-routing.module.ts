import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from "./front.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    {
        path: '', component: FrontComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class FrontRoutingModule {
}
