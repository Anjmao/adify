import { NgbFormControlValidation } from './ngb-validation.directive';
import { AdService } from './services/ad.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowAuthedDirective } from './show-authed.directive';
import { ApiService, AuthGuard, JwtService, UserService } from 'app/shared';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        FlexLayoutModule,
    ],
    declarations: [
        ShowAuthedDirective,
    ],
    providers: [
        ApiService,
        AuthGuard,
        JwtService,
        UserService,
        AdService,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        ShowAuthedDirective,
        FlexLayoutModule,
    ]
})
export class SharedModule { }
