import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { CityListComponent } from './cities/city-list/city-list.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { CityCreateComponent } from './cities/city-create/city-create.component';
import { CityDetailComponent } from './cities/city-detail/city-detail.component';
import { CityUpdateComponent } from './cities/city-update/city-update.component';
import { AddressUpdateComponent } from './address/address-update/address-update.component';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { AddressListComponent } from './address/address-list/address-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CityListComponent,
    ToolbarComponent,
    CityCreateComponent,
    CityDetailComponent,
    CityUpdateComponent,
    AddressUpdateComponent,
    LandingPageComponent,
    AddressListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
