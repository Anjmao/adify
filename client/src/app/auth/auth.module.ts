import { SharedModule } from '../shared/shared.module';
import { NoAuthGuard } from './no-auth-guard.service';
import { NgModule, ModuleWithProviders, } from '@angular/core';
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'login',
        component: LoginComponent,
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
    declarations: [LoginComponent]
})
export class AuthModule { }
