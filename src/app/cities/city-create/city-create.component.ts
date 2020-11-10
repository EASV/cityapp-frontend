import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {City} from '../shared/city.model';
import {CityService} from '../shared/city.service';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrls: ['./city-create.component.scss']
})
export class CityCreateComponent implements OnInit {
  name = new FormControl('');
  zipCode = new FormControl('');
  creating = false;
  cityJustCreated: City;
  errString: string = '';
  constructor(private cityService: CityService) {}

  ngOnInit(): void {

  }

  save() {
    this.creating = true;
    let nameValue = this.name.value;
    let zipCodeValue = this.zipCode.value;
    let city: City = {
      name: nameValue,
      zipCode: zipCodeValue
    }
    this.cityService.createCity(city)
      .pipe(
        catchError(err => {
          this.creating = false;
          this.errString = err.error;
          return err;
        })
      )
      .subscribe(city => {
        this.name.reset();
        this.zipCode.reset();
        this.creating = false;
        this.errString = '';
        // this.cityJustCreated = city;
      });
  }
}
