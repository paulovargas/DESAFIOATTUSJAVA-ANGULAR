import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, switchMap } from 'rxjs';
import { BaseModalService } from '../../../../shared/components/modal/base-modal.service';
import { FormDebtorComponent } from '../../components/form-debtor/form-debtor.component';
import { Debtor } from '../../models/debtor.model';
import { DebtorService } from '../../services/debtor.service';

@Component({
  selector: 'app-debtor-page',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './debtor-page.component.html',
  styleUrls: ['./debtor-page.component.css']
})
export class DebtorPageComponent {
  private readonly debtorService = inject(DebtorService);
  private readonly modalService = inject(BaseModalService);
  private readonly refresh$ = new BehaviorSubject<void>(undefined);
  private readonly searchTerm$ = new BehaviorSubject<string>('');
  private readonly sortBy$ = new BehaviorSubject<string>('name');

  readonly debtors$ = this.refresh$.pipe(switchMap(() => this.debtorService.findAll()));
  readonly filteredDebtors$ = combineLatest([this.debtors$, this.searchTerm$, this.sortBy$]).pipe(
    map(([debtors, searchTerm, sortBy]) => {
      const term = searchTerm.trim().toLowerCase();
      const numericTerm = term.replace(/\D/g, '');
      let result = debtors;

      if (term) {
        result = debtors.filter((debtor) => {
          const cpfCnpj = debtor.cpfCnpj?.toLowerCase() ?? '';

          return (
            debtor.name?.toLowerCase().includes(term) ||
            cpfCnpj.includes(term) ||
            (!!numericTerm && cpfCnpj.replace(/\D/g, '').includes(numericTerm))
          );
        });
      }

      return [...result].sort((first, second) => {
        if (sortBy === 'id') {
          return first.id - second.id;
        }

        return String(first[sortBy as keyof Debtor] || '')
          .toLowerCase()
          .localeCompare(String(second[sortBy as keyof Debtor] || '').toLowerCase());
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

  openFormDebtor(debtor?: Debtor) {
    const modalRef = this.modalService.open(
      FormDebtorComponent,
      debtor ? 'Edi\u00e7\u00e3o de Devedor' : 'Cadastro de Devedor',
      { debtor }
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
