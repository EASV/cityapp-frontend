import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Address} from './address.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  addressesApiUrl = environment.webApiUrl + 'address';

  constructor(private httpClient: HttpClient) { }

  getAddress(id: number): Observable<Address> {
    return this.httpClient.get<Address>(this.addressesApiUrl +'/' + id);
  }
}
