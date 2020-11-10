import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CityCreateComponent} from './cities/city-create/city-create.component';
import {CityListComponent} from './cities/city-list/city-list.component';
import {CityDetailComponent} from './cities/city-detail/city-detail.component';
import {CityUpdateComponent} from './cities/city-update/city-update.component';
import {AddressUpdateComponent} from './addresses/address-update/address-update.component';

const routes: Routes = [
  {path: 'address/update/:id', component: AddressUpdateComponent},
  {path: 'cities', component: CityListComponent},
  {path: 'cities/create', component: CityCreateComponent},
  {path: 'cities/update/:id', component: CityUpdateComponent},
  {path: 'cities/:id', component: CityDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
