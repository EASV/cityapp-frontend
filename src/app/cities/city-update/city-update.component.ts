import { Component, OnInit } from '@angular/core';
import {CityService} from '../shared/city.service';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, switchMap, take, tap} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {City} from '../shared/city.model';
import {Observable, of} from 'rxjs';
import {AddressService} from '../../address/shared/address.service';
import {Address} from '../../address/shared/address.model';
import {CountryService} from '../../country/shared/country.service';
import {Country} from '../../country/shared/country.model';

@Component({
  selector: 'app-city-update',
  templateUrl: './city-update.component.html',
  styleUrls: ['./city-update.component.scss']
})
export class CityUpdateComponent implements OnInit {
  cityUpdateForm: FormGroup;
  updateObservable$: Observable<Country[]>;
  updating: boolean;
  errString: string;
  countries: Country[];
  err: any;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private cityService: CityService,
              private countryService: CountryService) {
  }

  ngOnInit(): void {
    this.updateObservable$ = this.route.paramMap
      .pipe(
        take(1),
        switchMap(params => {
          this.errString = '';
          //Give param from url (id)
          let id = +params.get('id');
          //get city from backend
          return this.cityService.getCityById(id);
        }),
        tap(city => {
          //Patch form data
          this.cityUpdateForm.patchValue(city);
          this.cityUpdateForm.patchValue({
            countryIdAfter: city.countryId
          });
        }),
        switchMap(() => {
          //Get All Countries from Backend
          return this.countryService.getCountries();
        }),
        tap(countries => {
          this.countries = countries;
        }),
        catchError(err => {
          this.errString = err.error ?? err.message;
          return of([]);
        })
      )

    this.cityUpdateForm = this.fb.group({
      zipCode: [''],
      name: [''],
      countryId: [''],
      countryIdAfter: [''],
    });

  }

  update() {
    this.errString = '';
    let updatedCity = this.cityUpdateForm.value;
    updatedCity.countryId = updatedCity.countryIdAfter;
    this.cityService.updateCity(updatedCity)
      .pipe(
        catchError(err => {
          this.errString = err.error ?? err.message;
          return of()
        })
      )
      .subscribe(city => {
        console.log('city' ,city);
        this.router.navigateByUrl('cities');
      });
  }
}
