import { FormComponent } from './form.component';
import { SharedModule } from '../shared/shared.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";


const routing: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'job/create',
        component: FormComponent,
        //canActivate: [NoAuthGuard],
    },
    /*{
        path: 'adform/:id',
        component: AdformComponent,
        //canActivate: [NoAuthGuard],
    }*/
])

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        routing,
    ],
    declarations: [FormComponent]
})
export class FormModule { }
