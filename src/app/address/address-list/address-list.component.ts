import { Component, OnInit } from '@angular/core';
import {AddressService} from '../shared/address.service';
import {Address} from '../shared/address.model';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  addresses$: Observable<Address[]>;
  err: string;
  constructor(private addressService: AddressService) {
  }

  ngOnInit(): void {
    this.addresses$ = this.addressService.getAddresses()
      .pipe(
        tap(() => this.err = undefined ),
        catchError(err => {
          this.err = err.error ?? err.message;
          return of([]);
        })
      );
  }

}
