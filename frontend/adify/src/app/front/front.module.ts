import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { FrontComponent } from './front.component';
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { LatestAdsComponent } from './latest-ads/latest-ads.component';
import { QuickFilterComponent } from './quick-filter/quick-filter.component';
import { FrontRoutingModule } from "./front-routing.module";
import { AdsListComponent } from './ads-list/ads-list.component';
import { SideFilterComponent } from './ads-list/side-filter/side-filter.component';
import { TopFilterComponent } from './ads-list/top-filter/top-filter.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatSliderModule,
        FrontRoutingModule
    ],
    declarations: [
        FooterComponent,
        HeaderComponent,
        FrontComponent,
        HomeComponent,
        LatestAdsComponent,
        QuickFilterComponent,
        AdsListComponent,
        SideFilterComponent,
        TopFilterComponent,
    ]
})
export class FrontModule {
}
