/* tslint:disable:no-unused-variable */

import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { DecimalPipe } from '@angular/common';
import { CountryService } from './country.service';

describe('Service: Country', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountryService, DecimalPipe]
    });
  });

  it('should ...', inject([CountryService], (service: CountryService) => {
    expect(service).toBeTruthy();
  }));
});

