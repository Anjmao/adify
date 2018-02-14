
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShowAuthedDirective } from './show-authed.directive';
import { AuthGuard, JwtService } from './services';
import { DataService } from './services/data.service';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    declarations: [
        ShowAuthedDirective,
    ],
    providers: [
        AuthGuard,
        JwtService,
        DataService
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        ShowAuthedDirective
    ]
})
export class SharedModule {
}
