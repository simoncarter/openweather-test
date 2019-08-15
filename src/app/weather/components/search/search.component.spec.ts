import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent, City } from './search.component';
import {ReactiveFormsModule} from '@angular/forms';
import Spy = jasmine.Spy;

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('search form', () => {
    it('should create the form', () => {
      expect(component.forecastSearchForm).toBeTruthy();
    });

    it('should update form value on changes', () => {
      component.forecastSearchForm.controls['city'].setValue('Paris');
      expect(component.forecastSearchForm.value.city).toEqual('Paris');
    });
  });

  describe('search', () => {
    it('should emit the search input when search is triggered ', () => {
      component.forecastSearchForm.controls['city'].setValue('Amsterdam');
      spyOn(component.forecastSearchEmitter, 'emit');
      component.search();
      expect(component.forecastSearchEmitter.emit).toHaveBeenCalledWith('Amsterdam');
    });
  });
});
