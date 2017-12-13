import { FormModule } from './form/form.module';
import { DetailsModule } from './details/details.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
    ],
    imports: [
        AppRoutingModule,
        AuthModule,
        HomeModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        SharedModule,
        FormModule,
        DetailsModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
