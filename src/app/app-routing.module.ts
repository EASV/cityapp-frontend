import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CityCreateComponent} from './cities/city-create/city-create.component';
import {CityListComponent} from './cities/city-list/city-list.component';
import {CityDetailComponent} from './cities/city-detail/city-detail.component';

const routes: Routes = [
  {path: 'cities', component: CityListComponent},
  {path: 'cities/:id', component: CityDetailComponent},
  {path: 'city-create', component: CityCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
