import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../../../Client/models/client.model';
import { Debtor } from '../../../Debtor/models/debtor.model';
import { Debt } from '../../models/debt.model';

@Component({
  selector: 'app-form-debt',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-debt.component.html',
  styleUrls: ['./form-debt.component.css']
})
export class FormDebtComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);

  private readonly emptyClient: Client = {
    id: '',
    companyName: '',
    cnpj: '',
    billingStreet: '',
    billingNumber: '',
    billingDistrict: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    email: '',
    contactName: '',
    phone: '',
    debts: [],
  };

  private readonly emptyDebtor: Debtor = {
    id: 0,
    name: '',
    cpfCnpj: '',
    email: '',
    phone: '',
    billingStreet: '',
    billingNumber: '',
    billingDistrict: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    debts: [],
  };

  readonly debtForm = this.formBuilder.group({
    id: [0],
    description: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    dueDate: ['', Validators.required],
    status: ['PENDENTE', Validators.required],
    client: this.formBuilder.control<Client>(this.emptyClient),
    debtor: this.formBuilder.control<Debtor>(this.emptyDebtor),
  });

  onSubmit() {
    if (this.debtForm.invalid) {
      this.debtForm.markAllAsTouched();
      return;
    }

    const debt: Debt = this.debtForm.getRawValue();
    console.log(debt);
  }
}
