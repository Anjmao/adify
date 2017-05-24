import { DetailsComponent } from './details.component';
import { SharedModule } from 'app/shared/shared.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdResolver } from './details-resolver';


const routing: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'ad/:id',
        component: DetailsComponent,
        resolve: {
            ad: AdResolver
        }
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
    providers: [
        AdResolver,
    ],
    declarations: [DetailsComponent]
})
export class DetailsModule { }
