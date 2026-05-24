import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BaseModalService } from '../../../../shared/components/modal/base-modal.service';
import { FormDebtorComponent } from '../../components/form-debtor/form-debtor.component';
import { DebtorService } from '../../services/debtor.service';

@Component({
  selector: 'app-debtor-page',
  imports: [AsyncPipe],
  templateUrl: './debtor-page.component.html',
  styleUrls: ['./debtor-page.component.css']
})
export class DebtorPageComponent {
  private readonly debtorService = inject(DebtorService);
  private readonly modalService = inject(BaseModalService);

  readonly debtors$ = this.debtorService.findAll();

  openFormDebtor() {
    this.modalService.open(
      FormDebtorComponent,
      'Cadastro de Devedor',
      {}
    );
  }
}
