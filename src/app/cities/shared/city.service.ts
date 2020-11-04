import { Injectable } from '@angular/core';
import {City} from './city.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  createCity(city: City): Observable<City> {
    return this.http.post<City>('https://localhost:5001/api/cities', city);
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>('https://localhost:5001/api/cities');
  }

  getCityById(id: number): Observable<City> {
    return this.http.get<City>('https://localhost:5001/api/cities/' + id);
  }

  delete(zipCode: number): Observable<City> {
    return this.http.delete<City>('https://localhost:5001/api/cities/' + zipCode);
  }
}
