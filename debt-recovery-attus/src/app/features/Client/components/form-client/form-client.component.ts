import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-form-client',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly clientService = inject(ClientService);
  private readonly activeModal = inject(NgbActiveModal);

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

    const { id: _id, debts: _debts, ...client } = this.clientForm.getRawValue();
    this.clientService.create(client as Client).subscribe(() => this.activeModal.close('saved'));
  }
}
