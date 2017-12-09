import { FormModule } from './form/form.module';
import { DetailsModule } from './details/details.module';
import { HeaderComponent } from './shared/layout/header.component';
import { FooterComponent } from './shared/layout/footer.component';
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
