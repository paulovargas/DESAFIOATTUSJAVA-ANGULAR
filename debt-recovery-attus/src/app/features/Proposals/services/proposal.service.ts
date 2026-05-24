import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Proposal } from '../models/proposal.model';

export type ProposalPayload = Pick<Proposal, 'debtId' | 'offeredAmount' | 'installments' | 'status' | 'createdAt'>;

@Injectable({ providedIn: 'root' })
export class ProposalService {
  private readonly apiUrl = 'http://localhost:8080/api/proposals';

  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(this.apiUrl);
  }

  findById(id: Proposal['id']): Observable<Proposal> {
    return this.http.get<Proposal>(`${this.apiUrl}/${id}`);
  }

  create(proposal: ProposalPayload): Observable<Proposal> {
    return this.http.post<Proposal>(this.apiUrl, proposal);
  }

  update(id: Proposal['id'], proposal: ProposalPayload): Observable<Proposal> {
    return this.http.put<Proposal>(`${this.apiUrl}/${id}`, proposal);
  }

  delete(id: Proposal['id']): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
