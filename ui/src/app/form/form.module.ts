import { NgbFormControlValidation } from '../shared/ngb-validation.directive';
import { FormComponent } from './form.component';
import { SharedModule } from 'app/shared/shared.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared';
import { FormAdResolver } from 'app/form/form-ad-resolver';


const routing: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'ad/create',
        component: FormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'ad/:id/edit',
        component: FormComponent,
        canActivate: [AuthGuard],
        resolve: {
            ad: FormAdResolver
        }
    }
])

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        routing,
    ],
    providers: [
        FormAdResolver,
    ],
    declarations: [FormComponent, NgbFormControlValidation]
})
export class FormModule { }
