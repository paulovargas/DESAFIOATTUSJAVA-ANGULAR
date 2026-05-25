import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export interface Endereco {
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private readonly viaCepUrl = 'https://viacep.com.br/ws';

  constructor(private readonly http: HttpClient) {}

  buscarCep(cep: string): Observable<Endereco> {
    const cepLimpo = this.limparCep(cep);

    if (cepLimpo.length !== 8) {
      return throwError(() => new Error('CEP deve conter 8 d\u00edgitos.'));
    }

    return this.http.get<ViaCepResponse>(`${this.viaCepUrl}/${cepLimpo}/json/`).pipe(
      map((response) => {
        if (response.erro) {
          throw new Error('CEP n\u00e3o encontrado.');
        }

        return {
          cep: response.cep,
          rua: response.logradouro,
          bairro: response.bairro,
          cidade: response.localidade,
          estado: response.uf,
          complemento: response.complemento,
        };
      })
    );
  }

  limparCep(cep: string): string {
    return (cep || '').replace(/\D/g, '');
  }
}
