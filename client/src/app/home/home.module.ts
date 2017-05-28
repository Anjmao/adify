import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';
import { ListComponent } from './list/list.component';

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
    ],
    declarations: [
        HomeComponent,
        ListComponent
    ],
    providers: [
        HomeAuthResolver
    ]
})
export class HomeModule { }
