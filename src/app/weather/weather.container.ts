import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Weather } from '../model/weather';
import { Store } from '@ngrx/store';
import * as fromStore from './store';

@Component({
  selector: 'app-weather',
  template: `
  <app-search (forecastSearchEmitter)="forecastSearch($event)"></app-search>
  <app-results [weather$]="cities$"></app-results>  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherContainer implements OnInit {

  cities$: Observable<Weather[]>;

  constructor(private store: Store<fromStore.WeatherState>) {}

  ngOnInit() {
    this.cities$ = this.store.select(fromStore.getAllWeatherAsArray);
  }

  forecastSearch(input: string) {
    this.store.dispatch(new fromStore.AddWeather(input));
  }
}
