import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';
import { ApiService, AuthGuard, JwtService, UserService } from "app/shared";
import { MaterialModule } from "app/shared/material.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        MaterialModule,
    ],
    declarations: [
        ListErrorsComponent,
        ShowAuthedDirective
    ],
    providers: [
        ApiService,
        AuthGuard,
        JwtService,
        UserService,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ListErrorsComponent,
        RouterModule,
        ShowAuthedDirective,
        MaterialModule,
    ]
})
export class SharedModule { }
