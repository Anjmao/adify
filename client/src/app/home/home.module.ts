import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MdChipsModule, MdGridListModule } from '@angular/material';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: HomeComponent,
        resolve: {
            // isAuthenticated: HomeAuthResolver
        }
    }
]);

@NgModule({
    imports: [
        homeRouting,
        SharedModule,
        MdChipsModule,
        MdGridListModule,
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        HomeAuthResolver
    ]
})
export class HomeModule { }
