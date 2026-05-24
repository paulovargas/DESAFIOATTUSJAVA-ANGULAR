/* tslint:disable:no-unused-variable */

import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { BaseModalService } from './base-modal.service';

describe('Service: BaseModal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseModalService]
    });
  });

  it('should ...', inject([BaseModalService], (service: BaseModalService) => {
    expect(service).toBeTruthy();
  }));
});

