import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Debtor } from '../models/debtor.model';

@Injectable({ providedIn: 'root' })
export class DebtorService {
  private readonly apiUrl = `${environment.apiBaseUrl}/debtors`;

  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<Debtor[]> {
    return this.http.get<Debtor[]>(this.apiUrl);
  }

  findById(id: Debtor['id']): Observable<Debtor> {
    return this.http.get<Debtor>(`${this.apiUrl}/${id}`);
  }

  create(debtor: Debtor): Observable<Debtor> {
    return this.http.post<Debtor>(this.apiUrl, debtor);
  }

  update(id: Debtor['id'], debtor: Debtor): Observable<Debtor> {
    return this.http.put<Debtor>(`${this.apiUrl}/${id}`, debtor);
  }

  delete(id: Debtor['id']): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
