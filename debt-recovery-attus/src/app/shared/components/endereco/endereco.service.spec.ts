/* tslint:disable:no-unused-variable */

import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EnderecoService } from './endereco.service';

describe('Service: Endereco', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnderecoService, provideHttpClient(), provideHttpClientTesting()]
    });
  });

  it('should ...', inject([EnderecoService], (service: EnderecoService) => {
    expect(service).toBeTruthy();
  }));
});

