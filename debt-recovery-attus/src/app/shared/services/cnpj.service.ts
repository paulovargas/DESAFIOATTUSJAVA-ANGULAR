import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ReceitaWsResponse {
  status: 'OK' | 'ERROR';
  message?: string;
  cnpj: string;
  nome: string;
  fantasia: string;
  logradouro: string;
  numero: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  email: string;
  telefone: string;
}

export interface Empresa {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  email: string;
  telefone: string;
}

@Injectable({
  providedIn: 'root'
})
export class CnpjService {
  private readonly apiUrl = `${environment.apiBaseUrl}/cnpj`;

  constructor(private readonly http: HttpClient) {}

  buscarCnpj(cnpj: string): Observable<Empresa> {
    const cnpjLimpo = this.limparCnpj(cnpj);

    if (cnpjLimpo.length !== 14) {
      return throwError(() => new Error('CNPJ deve conter 14 d\u00edgitos.'));
    }

    return this.http.get<ReceitaWsResponse>(`${this.apiUrl}/${cnpjLimpo}`).pipe(
      map((response) => {
        if (response.status === 'ERROR') {
          throw new Error(response.message || 'CNPJ n\u00e3o encontrado.');
        }

        return {
          cnpj: response.cnpj,
          razaoSocial: response.nome,
          nomeFantasia: response.fantasia,
          rua: response.logradouro,
          numero: response.numero,
          bairro: response.bairro,
          cidade: response.municipio,
          estado: response.uf,
          cep: response.cep,
          email: response.email,
          telefone: response.telefone,
        };
      })
    );
  }

  limparCnpj(cnpj: string): string {
    return (cnpj || '').replace(/\D/g, '');
  }
}
