import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {City} from '../shared/city.model';
import {CityService} from '../shared/city.service';
import {catchError, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  cities$: Observable<City[]>
  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.cities$ = this.cityService.getCities();
  }

  delete(city: City) {
    this.cityService.delete(city.zipCode)
      .pipe(
        switchMap(c => this.cities$ = this.cityService.getCities()),
        catchError(err => {
          return err;
        })
      ).subscribe()
    /*this.cityService.delete(city).subscribe(
      c => {
        this.cities$ = this.cityService.getCities();
      }
    );*/
  }
}
