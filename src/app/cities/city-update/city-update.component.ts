import {Component, OnDestroy, OnInit} from '@angular/core';
import {CityService} from '../shared/city.service';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, map, switchMap, take, tap} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {CountryService} from '../../country/shared/country.service';
import {Country} from '../../country/shared/country.model';
import {TouristService} from '../../tourist/shared/tourist.service';
import {Tourist} from '../../tourist/shared/tourist.model';

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
  err: any;
  tourists: Tourist[];

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private cityService: CityService,
              private countryService: CountryService,
              private touristService: TouristService) {
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
          this.cityUpdateForm.patchValue({
            touristIdsAfter:  city.tourists?.map(tv => tv.touristId)
          })
          /*let torusitIdArray = [];
          for(let i; i <city.tourists.length; i++) {
            torusitIdArray.push(city.tourists[i].touristId);
          }
          city.tourists.forEach(tourist => torusitIdArray.push(tourist.touristId));
            */

        }),
        switchMap(() => {
          //Get All Countries from Backend
          return this.touristService.getAll();
        }),
        tap(tourists => {
          this.tourists = tourists;
        }),
        switchMap(() => {
          //Get All Countries from Backend
          return this.countryService.getCountries();
        }),
        catchError(this.err)
      )

    this.cityUpdateForm = this.fb.group({
      zipCode: [''],
      name: [''],
      countryId: [''],
      countryIdAfter: [''],
      touristIdsAfter: [[]]
    });

  }

  update() {
    this.errString = '';
    let updatedCity = this.cityUpdateForm.value;
    updatedCity.countryId = updatedCity.countryIdAfter;
    /*updatedCity.tourists = [];
    for (let i = 0; i <  updatedCity.touristIdsAfter.length; i++) {
      updatedCity.tourists.push({
        cityId: updatedCity.zipCode,
        touristId: updatedCity.touristIdsAfter[i],
        visitDate: new Date()
      })
    }*/
    updatedCity.tourists = updatedCity.touristIdsAfter.map(id => {
      return {
        cityId: updatedCity.zipCode,
        touristId: id,
        visitDate: new Date()
      }
    });
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
