import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Debtor } from '../../models/debtor.model';
import { DebtorService } from '../../services/debtor.service';

@Component({
  selector: 'app-form-debtor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-debtor.component.html',
  styleUrls: ['./form-debtor.component.css']
})
export class FormDebtorComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly debtorService = inject(DebtorService);
  private readonly activeModal = inject(NgbActiveModal);

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

    const { id: _id, debts: _debts, ...debtor } = this.debtorForm.getRawValue();
    this.debtorService.create(debtor as Debtor).subscribe(() => this.activeModal.close('saved'));
  }
}
