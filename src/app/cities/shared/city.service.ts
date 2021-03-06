import { Injectable } from '@angular/core';
import {City} from './city.model';
import {HttpClient} from '@angular/common/http';
import {interval, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Filter} from '../../shared/filter.model';
import {FilteredList} from '../../shared/filtered-list.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  citiesApiUrl = environment.webApiUrl + 'cities';
  constructor(private http: HttpClient) { }

  createCity(city: City): Observable<City> {
    return this.http.post<City>(this.citiesApiUrl, city);
  }

  // https://localhost:5001/api/cities?itemsPrPage=3&currentPage=1
  getCities(filter: Filter = undefined): Observable<FilteredList<City>> {
    let url = this.citiesApiUrl + '?';
    if(filter && filter.itemsPrPage > 0 && filter.currentPage > 0) {
      url = url
        + 'itemsPrPage=' + filter.itemsPrPage
        + '&currentPage=' + filter.currentPage + '&';
    }
    if(filter && filter.searchField?.length > 0 && filter.searchText?.length > 0) {
      url = url
        + 'searchField=' + filter.searchField
        + '&searchText=' + filter.searchText;
    }
    return this.http.get<FilteredList<City>>(url);
  }

  getCityById(id: number): Observable<City> {
    return this.http.get<City>(this.citiesApiUrl + '/' + id);
  }

  delete(zipCode: number): Observable<City> {
    return this.http.delete<City>(this.citiesApiUrl + '/' + zipCode);
  }

  updateCity(updatedCity: City): Observable<City> {
    return this.http.put<City>(this.citiesApiUrl + '/' + updatedCity.zipCode, updatedCity);
  }
}
