import { Injectable } from '@angular/core';
import {City} from './city.model';
import {HttpClient} from '@angular/common/http';
import {interval, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  citiesApiUrl = environment.webApiUrl + 'cities';
  constructor(private http: HttpClient) { }

  createCity(city: City): Observable<City> {
    return this.http.post<City>(this.citiesApiUrl, city);
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.citiesApiUrl);
  }

  getCityById(id: number): Observable<City> {
    return this.http.get<City>(this.citiesApiUrl + '/' + id);
  }

  delete(zipCode: number): Observable<City> {
    return this.http.delete<City>(this.citiesApiUrl + '/' + zipCode);
  }

  getObservable() : Observable<number> {
    return interval(2000);
  }

  updateCity(updatedCity: City): Observable<City> {
    return this.http.put<City>(this.citiesApiUrl + '/' + updatedCity.zipCode, updatedCity);
  }
}
