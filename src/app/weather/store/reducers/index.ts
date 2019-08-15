import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromWeather from './weather.reducers';

export interface WeatherState {
  weather: fromWeather.WeatherState;
}

export const reducers: ActionReducerMap<WeatherState> = {
  weather: fromWeather.reducer,
};

export const getWeatherState = createFeatureSelector<WeatherState>('weather');

export const getWeatherData = createSelector(
  getWeatherState,
  (state: WeatherState) => state.weather
);

export const getWeatherEntities = createSelector(getWeatherData, fromWeather.getWeatherEntities);

export const getAllWeatherAsArray = createSelector(
  getWeatherEntities,
  (entities) => {
    return Object.keys(entities).map(id => entities[id]);
  }
);
