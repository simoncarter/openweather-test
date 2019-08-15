import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherContainer } from './weather.container';
import { AddWeather } from './store/actions/weather';
import { Store, StoreModule } from '@ngrx/store';
import { reducers} from './store/reducers';
import { WeatherState } from './store/reducers/weather.reducers';
import * as fromStore from './store';

describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;
  let store: Store<WeatherState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherContainer ],
      imports: [StoreModule.forRoot(reducers)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    store = TestBed.get( Store );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the weather container component', () => {
    expect(component).toBeTruthy();
  });

  it('should create an Observable with type Weather[]', () => {
    expect(component.cities$).toBeTruthy();
  });

  describe('forecastSearch method', () => {
    it('should dispatch the correct action', () => {
      spyOn(store, 'dispatch').and.callThrough();
      const input = 'Tokyo';
      const addCityAction: AddWeather = new fromStore.AddWeather(input);
      component.forecastSearch(input);
      expect(store.dispatch).toHaveBeenCalledWith(addCityAction);
    });
  });

});
