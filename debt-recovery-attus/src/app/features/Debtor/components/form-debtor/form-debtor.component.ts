import { Component, Input, inject } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Debtor } from '../../models/debtor.model';
import { DebtorService } from '../../services/debtor.service';
import { EnderecoComponent } from '../../../../shared/components/endereco/endereco.component';
import { CnpjService } from '../../../../shared/services/cnpj.service';

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
    cpfCnpj: ['', [Validators.required, FormDebtorComponent.cpfCnpjValidator]],
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
    const cpfCnpjLimpo = this.onlyNumbers(cpfCnpj);

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

  private static cpfCnpjValidator(control: AbstractControl): ValidationErrors | null {
    const value = FormDebtorComponent.onlyNumbersFromValue(control.value);

    if (!value) {
      return null;
    }

    if (value.length === 11 && FormDebtorComponent.isValidCpf(value)) {
      return null;
    }

    if (value.length === 14 && FormDebtorComponent.isValidCnpj(value)) {
      return null;
    }

    return { cpfCnpj: true };
  }

  private static isValidCpf(cpf: string): boolean {
    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    const digit = (factor: number) => {
      let total = 0;

      for (let index = 0; index < factor - 1; index++) {
        total += Number(cpf[index]) * (factor - index);
      }

      const rest = (total * 10) % 11;
      return rest === 10 ? 0 : rest;
    };

    return digit(10) === Number(cpf[9]) && digit(11) === Number(cpf[10]);
  }

  private static isValidCnpj(cnpj: string): boolean {
    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    const digit = (weights: number[]) => {
      const total = weights.reduce((sum, weight, index) => sum + Number(cnpj[index]) * weight, 0);
      const rest = total % 11;
      return rest < 2 ? 0 : 11 - rest;
    };

    return (
      digit([5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) === Number(cnpj[12]) &&
      digit([6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) === Number(cnpj[13])
    );
  }

  private onlyNumbers(value: string): string {
    return FormDebtorComponent.onlyNumbersFromValue(value);
  }

  private static onlyNumbersFromValue(value: unknown): string {
    return String(value || '').replace(/\D/g, '');
  }
}
