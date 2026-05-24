import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../../../Client/models/client.model';
import { ClientService } from '../../../Client/services/client.service';
import { Debtor } from '../../../Debtor/models/debtor.model';
import { DebtorService } from '../../../Debtor/services/debtor.service';
import { Debt } from '../../models/debt.model';
import { DebtService } from '../../services/debt.service';

@Component({
  selector: 'app-form-debt',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './form-debt.component.html',
  styleUrls: ['./form-debt.component.css']
})
export class FormDebtComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly debtService = inject(DebtService);
  private readonly clientService = inject(ClientService);
  private readonly debtorService = inject(DebtorService);
  private readonly activeModal = inject(NgbActiveModal);

  readonly clients$ = this.clientService.findAll();
  readonly debtors$ = this.debtorService.findAll();

  readonly emptyClient: Client = {
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

  readonly emptyDebtor: Debtor = {
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

    const debt = this.debtForm.getRawValue();
    if (!debt.client.id || !debt.debtor.id) {
      this.debtForm.markAllAsTouched();
      return;
    }

    const payload = {
      description: debt.description,
      amount: debt.amount,
      dueDate: debt.dueDate,
      status: debt.status,
      client: { id: debt.client.id },
      debtor: { id: debt.debtor.id },
    } as unknown as Debt;

    this.debtService.create(payload).subscribe(() => this.activeModal.close('saved'));
  }
}
