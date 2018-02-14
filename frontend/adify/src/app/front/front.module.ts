import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontComponent } from './front.component';
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { HomeComponent } from './home/home.component';
import { LatestAdsComponent } from './latest-ads/latest-ads.component';
import { QuickFilterComponent } from './quick-filter/quick-filter.component';
import { FrontRoutingModule } from "./front-routing.module";
import { AdsListModule } from "./ads-list/ads-list.module";
import { AdDetailsModule } from "./ad-details/ad-details.module";

@NgModule({
    imports: [
        CommonModule,
        AdsListModule,
        AdDetailsModule,
        FrontRoutingModule
    ],
    declarations: [
        FooterComponent,
        HeaderComponent,
        FrontComponent,
        HomeComponent,
        LatestAdsComponent,
        QuickFilterComponent
    ]
})
export class FrontModule {
}
