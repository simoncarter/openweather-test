import {TestBed} from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {cold} from 'jasmine-marbles';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {_throw} from 'rxjs/observable/throw';

import {WeatherEffects} from './weather';
import {reducers} from '../reducers';
import {AddWeather, AddWeatherFail, AddWeatherSuccess} from '../actions/weather';
import {Weather} from '../../../model/weather';
import {WeatherService} from '../../weather.service';


describe('Weather Effects', () => {
  let weatherService;
  let weatherEffects;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot(reducers)
    ],
    providers: [
      WeatherEffects,
      Actions,
      {
        provide: WeatherService,
        useValue: jasmine.createSpyObj('WeatherService', ['searchWeatherForCity'])
      }
    ]
  }));

  beforeEach(() => {
    weatherEffects = TestBed.get(WeatherEffects);
    weatherService = TestBed.get(WeatherService);
  });

  describe('search city weather effect', () => {
    it('should fire an AddWeatherSuccess action on successful service method call', function () {
      const serviceResponse = {'London': 'Sunny'}; // whatever, as it's a mock
      weatherService.searchWeatherForCity.and.returnValue(of(serviceResponse));
      const actions: Observable<any> = cold('a', { a: new AddWeather('Paris') });
      const effects = new WeatherEffects(new Actions(actions), weatherService);
      const expected = cold('b', { b: new AddWeatherSuccess(serviceResponse as Weather) });
      expect(effects.City$).toBeObservable(expected);
    });

    it('should fire an AddWeatherFail action if service method call failed', function () {
      const error = {
        'error': 'Call Failed',
        'message': 'Fail'
      };
      weatherService.searchWeatherForCity.and.returnValue(_throw(error));
      const actions: Observable<any> = cold('a', { a: new AddWeather('Paris') });
      const effects = new WeatherEffects(new Actions(actions), weatherService);
      const expected = cold('b', { b: new AddWeatherFail(error) });
      expect(effects.City$).toBeObservable(expected);
    });
  });

});
