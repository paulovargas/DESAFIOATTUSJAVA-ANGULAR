import { Component, Input, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { EnderecoComponent } from '../../../../shared/components/endereco/endereco.component';
import { CnpjService } from '../../../../shared/services/cnpj.service';
import { cnpjValidator } from '../../../../shared/validators/document.validators';

@Component({
  selector: 'app-form-client',
  standalone: true,
  imports: [ReactiveFormsModule, EnderecoComponent],
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly clientService = inject(ClientService);
  private readonly cnpjService = inject(CnpjService);
  private readonly activeModal = inject(NgbActiveModal);
  isLoadingCnpj = false;
  cnpjError = '';

  readonly clientForm = this.formBuilder.group({
    id: [''],
    companyName: ['', Validators.required],
    cnpj: ['', [Validators.required, cnpjValidator()]],
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

  @Input() set client(client: Client | undefined) {
    if (!client) {
      return;
    }

    this.clientForm.patchValue({
      id: client.id,
      companyName: client.companyName,
      cnpj: client.cnpj,
      billingStreet: client.billingStreet,
      billingNumber: client.billingNumber,
      billingDistrict: client.billingDistrict,
      billingCity: client.billingCity,
      billingState: client.billingState,
      billingZipCode: client.billingZipCode,
      email: client.email,
      contactName: client.contactName,
      phone: client.phone,
      debts: client.debts,
    });
  }

  onSubmit() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const { id, debts: _debts, ...client } = this.clientForm.getRawValue();
    const request$ = id
      ? this.clientService.update(id, client as Client)
      : this.clientService.create(client as Client);

    request$.subscribe(() => this.activeModal.close('saved'));
  }

  buscarCnpj() {
    const cnpj = this.clientForm.controls.cnpj.value;
    this.cnpjError = '';

    if (!cnpj || this.clientForm.controls.cnpj.invalid) {
      return;
    }

    this.isLoadingCnpj = true;
    this.cnpjService.buscarCnpj(cnpj).subscribe({
      next: (empresa) => {
        this.clientForm.patchValue({
          cnpj: empresa.cnpj,
          companyName: empresa.razaoSocial,
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
