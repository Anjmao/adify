import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';
import { AdsListComponent } from './list/list.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { TestComponent } from './test/test.component';

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
    ],
    declarations: [
        HomeComponent,
        AdsListComponent,
        UserMenuComponent,
        TestComponent
    ],
    providers: [
        HomeAuthResolver
    ]
})
export class HomeModule { }
