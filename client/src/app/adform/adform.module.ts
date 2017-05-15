import { SharedModule } from '../shared/shared.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdformComponent } from './adform.component';
import { RouterModule } from "@angular/router";


const adformRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'adform',
        component: AdformComponent,
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
        adformRouting,
    ],
    declarations: [AdformComponent]
})
export class AdformModule { }
