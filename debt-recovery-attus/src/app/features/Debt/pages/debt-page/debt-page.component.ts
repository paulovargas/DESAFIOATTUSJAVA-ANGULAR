import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
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

  readonly debts$ = this.debtService.findAll();

  openFormDebt() {
    this.modalService.open(
      FormDebtComponent,
      'Cadastro de Divida',
      {}
    );
  }
}
