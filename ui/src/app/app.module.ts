import { FormModule } from './form/form.module';
import { DetailsModule } from './details/details.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { AuthGuard } from './shared/services';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([]);

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
    ],
    imports: [
        rootRouting,
        AuthModule,
        HomeModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        SharedModule,
        FormModule,
        DetailsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
