import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {City} from '../shared/city.model';
import {CityService} from '../shared/city.service';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {Filter} from '../../shared/filter.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FilteredList} from '../../shared/filtered-list.model';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  filterForm: FormGroup;
  listData$: Observable<FilteredList<City>>
  cities: City[];
  filter: Filter = {
    itemsPrPage: 5,
    currentPage: 1
  };
  count: number;
  err: any;
  constructor(private cityService: CityService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      itemsPrPage: [''],
      currentPage: [''],
      searchText: ['']
    })
    this.filterForm.patchValue(this.filter);
    this.getCities();
    this.filterForm.valueChanges.subscribe(() => {
      this.getCities();
    });
  }

  getCities(currentPage: number = 0) {
    if(currentPage > 0) {
      this.filterForm.patchValue({currentPage: currentPage});
    }
    let filter = this.filterForm.value as Filter;
    if(filter.currentPage <= 0) {
      filter.currentPage = 1;
    }
    if(filter.searchText) {
      filter.searchField = "Name";
    }
    this.listData$ = this.cityService.getCities(filter).pipe(
      tap(filteredList => {
        this.count = filteredList.totalCount;
        this.cities = filteredList.list;
      }),
      catchError(this.err)
    );
  }

  delete(city: City) {
    this.cityService.delete(city.zipCode)
      .pipe(
        tap(() => this.getCities()),
        catchError(err => {
          return err;
        })
      ).subscribe()
    /*this.cityService.delete(city).subscribe(
      c => {
        this.cities$ = this.cityService.getCities();
      }
    );*/
  }
  get itemsPrPage(): number { return (this.filterForm.value as Filter).itemsPrPage; }
  get currentPage(): number { return (this.filterForm.value as Filter).currentPage; }
  get maxPages(): number { return Math.ceil(this.count / this.itemsPrPage); }

}
