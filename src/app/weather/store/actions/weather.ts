import { Action } from '@ngrx/store';
import { Weather } from '../../../model/weather';

export const ADD_CITY = '[Weather] Add City';
export const ADD_CITY_FAIL = '[Weather] Add City Fail';
export const ADD_CITY_SUCCESS = '[Weather] Add City Success';

export class AddWeather implements Action {
  readonly type: string = ADD_CITY;
  constructor(public payload: string) {}
}

export class AddWeatherFail implements Action {
  readonly type = ADD_CITY_FAIL;
  constructor(public payload: any) {}
}

export class AddWeatherSuccess implements Action {
  readonly type = ADD_CITY_SUCCESS;
  constructor(public payload: Weather) {}
}

export type WeatherActions =
  AddWeather |
  AddWeatherFail |
  AddWeatherSuccess;
