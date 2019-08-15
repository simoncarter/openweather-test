import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class SearchComponent {
  @Output()
  forecastSearchEmitter: EventEmitter<string> = new EventEmitter<string>();
  forecastSearchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.forecastSearchForm = this.formBuilder.group({
      city: new FormControl('', [])
    });
  }

  get city() {
    return this.forecastSearchForm.get('city');
  }

  search(): void {
    const cityUserInput = this.forecastSearchForm.value.city;
    this.forecastSearchEmitter.emit(cityUserInput);
    this.forecastSearchForm.reset();
  }
}

export interface City{
  name: string;
}