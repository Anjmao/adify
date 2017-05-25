import { AdService } from './services/ad.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';
import { ApiService, AuthGuard, JwtService, UserService } from 'app/shared';
import { MaterialModule } from 'app/shared/material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        MaterialModule,
        FlexLayoutModule,
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
        AdService,
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
        FlexLayoutModule,
    ]
})
export class SharedModule { }
