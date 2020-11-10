import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CityService} from '../../cities/shared/city.service';
import {AddressService} from '../shared/address.service';
import {Observable, of} from 'rxjs';
import {City} from '../../cities/shared/city.model';
import {Address} from '../shared/address.model';
import {catchError, switchMap, take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-address-update',
  templateUrl: './address-update.component.html',
  styleUrls: ['./address-update.component.scss']
})
export class AddressUpdateComponent implements OnInit {
  addressUpdateForm: FormGroup;
  cities$: Observable<City[]>;
  updating: boolean;
  errString: string;
  address: Address;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private cityService: CityService,
              private addressService: AddressService) { }

  ngOnInit(): void {
    this.cities$ = this.route.paramMap
      .pipe(
        take(1),
        switchMap(params => {
          let id = +params.get('id');
          return this.addressService.getAddress(id);
        }),
        tap(address => {
          this.addressUpdateForm.patchValue(address);
          this.addressUpdateForm.patchValue({cities: address.cityId})
          this.address = address;
        }),
        switchMap( () => {
          return this.cityService.getCities()
        }),
        catchError( err => {
          if(err && err.error) {
            this.errString = err.error;
          }
          if(err && err.message) {
            this.errString = err.message;
          }
          return of([]);
        })
      )

    this.addressUpdateForm = this.fb.group({
      id: [''],
      streetName: [''],
      streetNr: [''],
      additional: [''],
      cityId: [''],
      cities: ['']
    });
  }

  update() {
    debugger
  }
}