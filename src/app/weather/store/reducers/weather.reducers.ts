import * as fromWeather from '../actions/weather';
import {Weather} from '../../../model/weather';

export interface WeatherState {
  entities: { [id: string]: Weather };
}

export const initialState: WeatherState = {
  entities: {}
};

export function reducer(state = initialState,
                        action: fromWeather.WeatherActions) {

  switch (action.type) {

    case fromWeather.ADD_CITY: {
      return {
        ...state,
      };
    }

    case fromWeather.ADD_CITY_SUCCESS: {
      const newEntities = {...state.entities};
      newEntities[action.payload.city.name] = action.payload;

      return {...state, entities: newEntities};
    }

    case fromWeather.ADD_CITY_FAIL: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}

// export a slice of data
export const getWeatherEntities = (state: WeatherState) => state.entities;
