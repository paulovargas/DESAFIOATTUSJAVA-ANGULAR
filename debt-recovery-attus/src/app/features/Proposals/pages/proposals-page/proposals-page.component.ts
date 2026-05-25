import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, switchMap } from 'rxjs';

import { DebtService } from '../../../Debt/services/debt.service';
import { apiErrorMessage } from '../../../../shared/services/api-error.util';
import { Proposal } from '../../models/proposal.model';
import { ProposalPayload, ProposalService } from '../../services/proposal.service';

@Component({
  selector: 'app-proposals-page',
  imports: [AsyncPipe, CurrencyPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './proposals-page.component.html',
  styleUrls: ['./proposals-page.component.css']
})
export class ProposalsPageComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly proposalService = inject(ProposalService);
  private readonly debtService = inject(DebtService);
  private readonly refresh$ = new BehaviorSubject<void>(undefined);
  private readonly searchTerm$ = new BehaviorSubject<string>('');
  private readonly sortBy$ = new BehaviorSubject<string>('createdAt');

  readonly proposals$ = this.refresh$.pipe(switchMap(() => this.proposalService.findAll()));
  readonly filteredProposals$ = combineLatest([this.proposals$, this.searchTerm$, this.sortBy$]).pipe(
    map(([proposals, searchTerm, sortBy]) => {
      const term = searchTerm.trim().toLowerCase();
      let result = proposals;

      if (term) {
        result = proposals.filter((proposal) =>
          proposal.debtorName?.toLowerCase().includes(term) ||
          proposal.debtDescription?.toLowerCase().includes(term) ||
          proposal.status?.toLowerCase().includes(term)
        );
      }

      return [...result].sort((first, second) => {
        if (sortBy === 'offeredAmount' || sortBy === 'installments' || sortBy === 'id') {
          return Number(first[sortBy as keyof Proposal]) - Number(second[sortBy as keyof Proposal]);
        }

        return String(first[sortBy as keyof Proposal] || '')
          .toLowerCase()
          .localeCompare(String(second[sortBy as keyof Proposal] || '').toLowerCase());
      });
    })
  );
  readonly debts$ = this.debtService.findAll();

  editingProposalId: number | null = null;
  formError = '';

  get searchTerm(): string {
    return this.searchTerm$.value;
  }

  set searchTerm(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }

  get sortBy(): string {
    return this.sortBy$.value;
  }

  set sortBy(sortBy: string) {
    this.sortBy$.next(sortBy);
  }

  readonly proposalForm = this.formBuilder.group({
    debtId: [0, [Validators.required, Validators.min(1)]],
    offeredAmount: [0, [Validators.required, Validators.min(0.01)]],
    installments: [1, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
    status: ['EM_ANALISE', Validators.required],
    createdAt: [this.today(), Validators.required],
  });

  saveProposal() {
    this.formError = '';

    if (this.proposalForm.invalid) {
      this.proposalForm.markAllAsTouched();
      return;
    }

    const payload: ProposalPayload = this.proposalForm.getRawValue();
    const request$ = this.editingProposalId
      ? this.proposalService.update(this.editingProposalId, payload)
      : this.proposalService.create(payload);

    request$.subscribe({
      next: () => {
        this.resetForm();
        this.refresh$.next();
      },
      error: (error) => {
        this.formError = apiErrorMessage(error, 'N\u00e3o foi poss\u00edvel salvar a proposta.');
      },
    });
  }

  editProposal(proposal: Proposal) {
    this.editingProposalId = proposal.id;
    this.proposalForm.setValue({
      debtId: proposal.debtId,
      offeredAmount: proposal.offeredAmount,
      installments: proposal.installments,
      status: proposal.status,
      createdAt: proposal.createdAt,
    });
  }

  deleteProposal(id: number) {
    this.formError = '';
    this.proposalService.delete(id).subscribe({
      next: () => this.refresh$.next(),
      error: (error) => {
        this.formError = apiErrorMessage(error, 'N\u00e3o foi poss\u00edvel excluir a proposta.');
      },
    });
  }

  resetForm() {
    this.editingProposalId = null;
    this.formError = '';
    this.proposalForm.reset({
      debtId: 0,
      offeredAmount: 0,
      installments: 1,
      status: 'EM_ANALISE',
      createdAt: this.today(),
    });
  }

  private today() {
    return new Date().toISOString().slice(0, 10);
  }
}
