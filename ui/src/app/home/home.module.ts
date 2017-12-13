import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';
import { AdsListComponent } from './list/list.component';
import { TestComponent } from './test/test.component';
import { FilterService } from './filter.service';
import { NgSelectModule } from '@ng-select/ng-select';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: HomeComponent,
        resolve: {
            isAuthenticated: HomeAuthResolver
        },
        children: [
            {
                path: '',
                component: AdsListComponent,
            },
            {
                path: 'test',
                component: TestComponent
            }
        ]
    },
]);

@NgModule({
    imports: [
        homeRouting,
        SharedModule,
        NgSelectModule
    ],
    declarations: [
        HomeComponent,
        AdsListComponent,
        TestComponent
    ],
    providers: [
        HomeAuthResolver,
        FilterService
    ]
})
export class HomeModule {
}
