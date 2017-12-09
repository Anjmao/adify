import { AdService, MockAdService } from './services/ad.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ShowAuthedDirective } from './show-authed.directive';
import { ApiService, AuthGuard, JwtService, UserService } from './services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule
    ],
    declarations: [
        ShowAuthedDirective,
    ],
    providers: [
        {provide: AdService, useClass: MockAdService},
        ApiService,
        AuthGuard,
        JwtService,
        UserService
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        ShowAuthedDirective
    ]
})
export class SharedModule {
}
