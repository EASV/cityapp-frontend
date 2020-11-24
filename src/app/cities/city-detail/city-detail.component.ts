import {Component, OnDestroy, OnInit} from '@angular/core';
import {CityService} from '../shared/city.service';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, first, map, switchMap, take} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {City} from '../shared/city.model';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent implements OnInit {
  id: number;
  city$: Observable<City>;
  err: any;
  constructor( private route: ActivatedRoute,
               private router: Router,
               private cityService: CityService) { }

  ngOnInit(): void {
    this.city$ = this.route.paramMap
      .pipe(
        take(1),
        switchMap(params => {
          this.id = +params.get('id');
          return this.city$ = this.cityService.getCityById(this.id)
        }),
        catchError(this.err)
      );
  }

  delete() {
    this.cityService.delete(this.id)
      .pipe(
        take(1),
        catchError(this.err)
      )
      .subscribe(() => {
        this.router.navigateByUrl('cities');
      })
  }
}
