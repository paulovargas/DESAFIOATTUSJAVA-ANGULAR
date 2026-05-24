import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-form-client',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly clientForm = this.formBuilder.group({
    id: [''],
    companyName: ['', Validators.required],
    cnpj: ['', Validators.required],
    billingStreet: [''],
    billingNumber: [''],
    billingDistrict: [''],
    billingCity: [''],
    billingState: [''],
    billingZipCode: [''],
    email: ['', Validators.email],
    contactName: [''],
    phone: [''],
    debts: this.formBuilder.control<Client['debts']>([]),
  });

  onSubmit() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const client: Client = this.clientForm.getRawValue();
    console.log(client);
  }
}
