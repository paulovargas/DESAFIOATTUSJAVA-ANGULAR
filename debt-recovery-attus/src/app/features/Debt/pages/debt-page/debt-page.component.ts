import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { BaseModalService } from '../../../../shared/components/modal/base-modal.service';
import { FormDebtComponent } from '../../components/form-debt/form-debt.component';
import { DebtService } from '../../services/debt.service';

@Component({
  selector: 'app-debt-page',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './debt-page.component.html',
  styleUrls: ['./debt-page.component.css']
})
export class DebtPageComponent {
  private readonly debtService = inject(DebtService);
  private readonly modalService = inject(BaseModalService);
  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  readonly debts$ = this.refresh$.pipe(switchMap(() => this.debtService.findAll()));

  openFormDebt() {
    const modalRef = this.modalService.open(
      FormDebtComponent,
      'Cadastro de Divida',
      {}
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
