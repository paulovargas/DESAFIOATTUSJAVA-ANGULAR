import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, switchMap } from 'rxjs';

import { DebtService } from '../../../Debt/services/debt.service';
import { Proposal } from '../../models/proposal.model';
import { ProposalPayload, ProposalService } from '../../services/proposal.service';

@Component({
  selector: 'app-proposals-page',
  imports: [AsyncPipe, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './proposals-page.component.html',
  styleUrls: ['./proposals-page.component.css']
})
export class ProposalsPageComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly proposalService = inject(ProposalService);
  private readonly debtService = inject(DebtService);
  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  readonly proposals$ = this.refresh$.pipe(switchMap(() => this.proposalService.findAll()));
  readonly debts$ = this.debtService.findAll();

  editingProposalId: number | null = null;

  readonly proposalForm = this.formBuilder.group({
    debtId: [0, [Validators.required, Validators.min(1)]],
    offeredAmount: [0, [Validators.required, Validators.min(0.01)]],
    installments: [1, [Validators.required, Validators.min(1)]],
    status: ['EM_ANALISE', Validators.required],
    createdAt: [this.today(), Validators.required],
  });

  saveProposal() {
    if (this.proposalForm.invalid) {
      this.proposalForm.markAllAsTouched();
      return;
    }

    const payload: ProposalPayload = this.proposalForm.getRawValue();
    const request$ = this.editingProposalId
      ? this.proposalService.update(this.editingProposalId, payload)
      : this.proposalService.create(payload);

    request$.subscribe(() => {
      this.resetForm();
      this.refresh$.next();
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
    this.proposalService.delete(id).subscribe(() => this.refresh$.next());
  }

  resetForm() {
    this.editingProposalId = null;
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
