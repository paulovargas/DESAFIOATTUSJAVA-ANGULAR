import { Component, inject } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { EnderecoService } from './endereco.service';

@Component({
  selector: 'app-endereco',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class EnderecoComponent {
  private readonly controlContainer = inject(ControlContainer);
  private readonly enderecoService = inject(EnderecoService);

  isLoadingCep = false;
  cepError = '';

  buscarCep() {
    const form = this.controlContainer.control;
    const cep = form?.get('billingZipCode')?.value;

    this.cepError = '';

    if (!cep || this.enderecoService.limparCep(cep).length !== 8) {
      return;
    }

    this.isLoadingCep = true;
    this.enderecoService.buscarCep(cep).subscribe({
      next: (endereco) => {
        form?.patchValue({
          billingZipCode: endereco.cep,
          billingStreet: endereco.rua,
          billingDistrict: endereco.bairro,
          billingCity: endereco.cidade,
          billingState: endereco.estado,
        });
        this.isLoadingCep = false;
      },
      error: (error: Error) => {
        this.cepError = error.message || 'Nao foi possivel buscar o CEP.';
        this.isLoadingCep = false;
      },
    });
  }
}
