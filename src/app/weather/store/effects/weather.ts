import {Injectable} from '@angular/core';

import {Actions, Effect} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as weatherActions from '../actions/weather';
import {WeatherService} from '../../weather.service';
import {of} from 'rxjs/observable/of';

@Injectable()
export class WeatherEffects {

  constructor(private actions$: Actions,
              private weatherService: WeatherService) {
  }

  @Effect()
  City$ = this.actions$.ofType(weatherActions.ADD_CITY).pipe(
    map((action: weatherActions.AddWeather) => action.payload),
    switchMap(cityStringInput => {
      return this.weatherService.searchWeatherForCity(cityStringInput)
        .pipe(
          map(weather => new weatherActions.AddWeatherSuccess(weather)),
          catchError(error => of(new weatherActions.AddWeatherFail(error)))
        );
    })
  );
}
