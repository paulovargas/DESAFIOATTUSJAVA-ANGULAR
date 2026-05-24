import { Component, Input, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Debtor } from '../../models/debtor.model';
import { DebtorService } from '../../services/debtor.service';
import { EnderecoComponent } from '../../../../shared/components/endereco/endereco.component';
import { CnpjService } from '../../../../shared/services/cnpj.service';
import { cpfCnpjValidator, onlyNumbers } from '../../../../shared/validators/document.validators';

@Component({
  selector: 'app-form-debtor',
  standalone: true,
  imports: [ReactiveFormsModule, EnderecoComponent],
  templateUrl: './form-debtor.component.html',
  styleUrls: ['./form-debtor.component.css']
})
export class FormDebtorComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly debtorService = inject(DebtorService);
  private readonly cnpjService = inject(CnpjService);
  private readonly activeModal = inject(NgbActiveModal);
  isLoadingCnpj = false;
  cnpjError = '';

  readonly debtorForm = this.formBuilder.group({
    id: [0],
    name: ['', Validators.required],
    cpfCnpj: ['', [Validators.required, cpfCnpjValidator()]],
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

  @Input() set debtor(debtor: Debtor | undefined) {
    if (!debtor) {
      return;
    }

    this.debtorForm.patchValue({
      id: debtor.id,
      name: debtor.name,
      cpfCnpj: debtor.cpfCnpj,
      email: debtor.email,
      phone: debtor.phone,
      billingStreet: debtor.billingStreet,
      billingNumber: debtor.billingNumber,
      billingDistrict: debtor.billingDistrict,
      billingCity: debtor.billingCity,
      billingState: debtor.billingState,
      billingZipCode: debtor.billingZipCode,
      debts: debtor.debts,
    });
  }

  onSubmit() {
    if (this.debtorForm.invalid) {
      this.debtorForm.markAllAsTouched();
      return;
    }

    const { id, debts: _debts, ...debtor } = this.debtorForm.getRawValue();
    const request$ = id
      ? this.debtorService.update(id, debtor as Debtor)
      : this.debtorService.create(debtor as Debtor);

    request$.subscribe(() => this.activeModal.close('saved'));
  }

  buscarCnpj() {
    const cpfCnpjControl = this.debtorForm.controls.cpfCnpj;
    const cpfCnpj = cpfCnpjControl.value;
    const cpfCnpjLimpo = onlyNumbers(cpfCnpj);

    this.cnpjError = '';

    if (cpfCnpjLimpo.length !== 14 || cpfCnpjControl.invalid) {
      return;
    }

    this.isLoadingCnpj = true;
    this.cnpjService.buscarCnpj(cpfCnpj).subscribe({
      next: (empresa) => {
        this.debtorForm.patchValue({
          cpfCnpj: empresa.cnpj,
          name: empresa.razaoSocial,
          billingStreet: empresa.rua,
          billingNumber: empresa.numero,
          billingDistrict: empresa.bairro,
          billingCity: empresa.cidade,
          billingState: empresa.estado,
          billingZipCode: empresa.cep,
          email: empresa.email,
          phone: empresa.telefone,
        });
        this.isLoadingCnpj = false;
      },
      error: (error: Error) => {
        this.cnpjError = error.message || 'Nao foi possivel buscar o CNPJ.';
        this.isLoadingCnpj = false;
      },
    });
  }
}
