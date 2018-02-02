import { SharedModule } from '../shared/shared.module';
import { NoAuthGuard } from './no-auth-guard.service';
import { NgModule, ModuleWithProviders, } from '@angular/core';
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CompleteComponent } from './complete/complete.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoAuthGuard],
    },
    {
        path: 'login/complete/:token',
        component: CompleteComponent,
        canActivate: [NoAuthGuard],
    }
])

@NgModule({
    imports: [
        authRouting,
        CommonModule,
        SharedModule,
    ],
    providers: [
        NoAuthGuard,
    ],
    declarations: [LoginComponent, CompleteComponent]
})
export class AuthModule { }
