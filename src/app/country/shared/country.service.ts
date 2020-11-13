import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {City} from '../../cities/shared/city.model';
import {Observable} from 'rxjs';
import {Country} from './country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  countryApiUrl = environment.webApiUrl + 'country';
  constructor(private http: HttpClient) { }

  getCountries() : Observable<Country[]>  {
    return this.http.get<Country[]>(this.countryApiUrl);
  }
}
