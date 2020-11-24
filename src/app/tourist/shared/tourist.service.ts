import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tourist} from './tourist.model';

@Injectable({
  providedIn: 'root'
})
export class TouristService {

  touristApiUrl = environment.webApiUrl + 'tourists';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Tourist[]> {
    return this.http.get<Tourist[]>(this.touristApiUrl);
  }
}
