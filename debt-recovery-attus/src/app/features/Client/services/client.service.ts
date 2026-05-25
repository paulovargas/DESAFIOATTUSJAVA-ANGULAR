import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Client } from '../models/client.model';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly apiUrl = `${environment.apiBaseUrl}/clients`;

  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  findById(id: Client['id']): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  update(id: Client['id'], client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client);
  }

  delete(id: Client['id']): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
