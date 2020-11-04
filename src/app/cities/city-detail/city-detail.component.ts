import {Component, OnDestroy, OnInit} from '@angular/core';
import {CityService} from '../shared/city.service';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, first, take} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {City} from '../shared/city.model';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent implements OnInit, OnDestroy {
  id: number;
  city$: Observable<City>;
  err: any;
  constructor( private route: ActivatedRoute,
               private router: Router,
               private cityService: CityService) { }


  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(take(1))
      .subscribe(
      params => {
        this.id = +params.get('id');
        this.city$ = this.cityService.getCityById(this.id);
      }
    )
  }

  delete() {
    this.cityService.delete(this.id)
      .pipe(
        catchError(err => {
          this.err = err;
          return err;
        })
      )
      .subscribe(() => {
        this.router.navigateByUrl('cities');
      })
  }
}
