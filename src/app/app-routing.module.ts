import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CityCreateComponent} from './cities/city-create/city-create.component';
import {CityListComponent} from './cities/city-list/city-list.component';
import {CityDetailComponent} from './cities/city-detail/city-detail.component';
import {CityUpdateComponent} from './cities/city-update/city-update.component';
import {AddressUpdateComponent} from './address/address-update/address-update.component';
import {LandingPageComponent} from './home/landing-page/landing-page.component';
import {AddressListComponent} from './address/address-list/address-list.component';

const routes: Routes = [
  {path: 'address', component: AddressListComponent},
  {path: 'address/update/:id', component: AddressUpdateComponent},
  {path: 'cities', component: CityListComponent},
  {path: 'cities/create', component: CityCreateComponent},
  {path: 'cities/update/:id', component: CityUpdateComponent},
  {path: 'cities/:id', component: CityDetailComponent},
  {path: 'home', component: LandingPageComponent},
  {path: '', redirectTo: 'home', pathMatch: 'prefix'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
