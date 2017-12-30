import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';
import { FilterService } from './filter.service';
import { NgSelectModule } from '@ng-select/ng-select';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: HomeComponent,
        resolve: {
            isAuthenticated: HomeAuthResolver
        }
    },
]);

@NgModule({
    imports: [
        homeRouting,
        SharedModule,
        NgSelectModule
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        HomeAuthResolver,
        FilterService
    ]
})
export class HomeModule {
}
