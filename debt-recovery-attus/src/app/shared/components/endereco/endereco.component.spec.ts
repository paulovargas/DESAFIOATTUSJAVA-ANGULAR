/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { EnderecoComponent } from './endereco.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, EnderecoComponent],
  template: `
    <form [formGroup]="form">
      <app-endereco />
    </form>
  `,
})
class HostComponent {
  form = new FormGroup({
    billingZipCode: new FormControl(''),
    billingStreet: new FormControl(''),
    billingNumber: new FormControl(''),
    billingDistrict: new FormControl(''),
    billingCity: new FormControl(''),
    billingState: new FormControl(''),
  });
}

describe('EnderecoComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HostComponent ],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const component = fixture.debugElement.query(By.directive(EnderecoComponent)).componentInstance;

    expect(component).toBeTruthy();
  });
});

