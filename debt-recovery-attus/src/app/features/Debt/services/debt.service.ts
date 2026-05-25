import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Debt } from '../models/debt.model';

@Injectable({ providedIn: 'root' })
export class DebtService {
  private readonly apiUrl = `${environment.apiBaseUrl}/debts`;

  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<Debt[]> {
    return this.http.get<Debt[]>(this.apiUrl);
  }

  findById(id: Debt['id']): Observable<Debt> {
    return this.http.get<Debt>(`${this.apiUrl}/${id}`);
  }

  findByDebtorId(id: number): Observable<Debt[]> {
    return this.http.get<Debt[]>(`${this.apiUrl}/debtor/${id}`);
  }

  create(debt: Debt): Observable<Debt> {
    return this.http.post<Debt>(this.apiUrl, debt);
  }

  update(id: Debt['id'], debt: Debt): Observable<Debt> {
    return this.http.put<Debt>(`${this.apiUrl}/${id}`, debt);
  }

  delete(id: Debt['id']): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
