import { Component, OnInit } from '@angular/core';
import {CityService} from '../shared/city.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, take, tap} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {City} from '../shared/city.model';
import {Observable} from 'rxjs';
import {AddressService} from '../../addresses/shared/address.service';
import {Address} from '../../addresses/shared/address.model';

@Component({
  selector: 'app-city-update',
  templateUrl: './city-update.component.html',
  styleUrls: ['./city-update.component.scss']
})
export class CityUpdateComponent implements OnInit {
  cityUpdateForm: FormGroup;
  cityToUpdate$: Observable<City>;
  updating: boolean;
  errString: string;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private cityService: CityService) {
  }

  ngOnInit(): void {
    this.cityToUpdate$ = this.route.paramMap
      .pipe(
        take(1),
        switchMap(params => {
          let id = +params.get('id');
          return this.cityService.getCityById(id);
        }),
        tap(city => {
          this.cityUpdateForm.patchValue({name: '' + city.name, zipCode: city.zipCode});
        })
      )

    this.cityUpdateForm = this.fb.group({
      zipCode: [''],
      name: [''],
    });
  }

  update() {

  }
}
