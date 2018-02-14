import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from "./front.component";
import { HomeComponent } from "./home/home.component";
import { AdsListComponent } from "./ads-list/ads-list.component";

const routes: Routes = [
    {
        path: '', component: FrontComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'ads', component: AdsListComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class FrontRoutingModule {
}
