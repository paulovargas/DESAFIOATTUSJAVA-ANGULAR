import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, switchMap } from 'rxjs';
import { BaseModalService } from '../../../../shared/components/modal/base-modal.service';
import { FormDebtComponent } from '../../components/form-debt/form-debt.component';
import { Debt } from '../../models/debt.model';
import { DebtService } from '../../services/debt.service';

@Component({
  selector: 'app-debt-page',
  imports: [AsyncPipe, CurrencyPipe, FormsModule],
  templateUrl: './debt-page.component.html',
  styleUrls: ['./debt-page.component.css']
})
export class DebtPageComponent {
  private readonly debtService = inject(DebtService);
  private readonly modalService = inject(BaseModalService);
  private readonly refresh$ = new BehaviorSubject<void>(undefined);
  private readonly searchTerm$ = new BehaviorSubject<string>('');
  private readonly sortBy$ = new BehaviorSubject<string>('dueDate');

  readonly debts$ = this.refresh$.pipe(switchMap(() => this.debtService.findAll()));
  readonly filteredDebts$ = combineLatest([this.debts$, this.searchTerm$, this.sortBy$]).pipe(
    map(([debts, searchTerm, sortBy]) => {
      const term = searchTerm.trim().toLowerCase();
      let result = debts;

      if (term) {
        result = debts.filter((debt) =>
          debt.description?.toLowerCase().includes(term) ||
          debt.client?.companyName?.toLowerCase().includes(term) ||
          debt.debtor?.name?.toLowerCase().includes(term) ||
          debt.status?.toLowerCase().includes(term)
        );
      }

      return [...result].sort((first, second) => {
        if (sortBy === 'amount' || sortBy === 'id') {
          return Number(first[sortBy as keyof typeof first]) - Number(second[sortBy as keyof typeof second]);
        }

        return String(first[sortBy as keyof typeof first] || '')
          .toLowerCase()
          .localeCompare(String(second[sortBy as keyof typeof second] || '').toLowerCase());
      });
    })
  );

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

  openFormDebt(debt?: Debt) {
    const modalRef = this.modalService.open(
      FormDebtComponent,
      debt ? 'Edi\u00e7\u00e3o de D\u00edvida' : 'Cadastro de D\u00edvida',
      { debt }
    );

    modalRef.result
      .then((result) => {
        if (result === 'saved') {
          this.refresh$.next();
        }
      })
      .catch(() => undefined);
  }
}
