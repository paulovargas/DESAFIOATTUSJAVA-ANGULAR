import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Debtor } from '../../models/debtor.model';

@Component({
  selector: 'app-form-debtor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-debtor.component.html',
  styleUrls: ['./form-debtor.component.css']
})
export class FormDebtorComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly debtorForm = this.formBuilder.group({
    id: [0],
    name: ['', Validators.required],
    cpfCnpj: ['', Validators.required],
    email: ['', Validators.email],
    phone: [''],
    billingStreet: [''],
    billingNumber: [''],
    billingDistrict: [''],
    billingCity: [''],
    billingState: [''],
    billingZipCode: [''],
    debts: this.formBuilder.control<Debtor['debts']>([]),
  });

  onSubmit() {
    if (this.debtorForm.invalid) {
      this.debtorForm.markAllAsTouched();
      return;
    }

    const debtor: Debtor = this.debtorForm.getRawValue();
    console.log(debtor);
  }
}
