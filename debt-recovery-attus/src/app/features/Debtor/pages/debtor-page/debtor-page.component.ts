import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
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
  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  readonly debtors$ = this.refresh$.pipe(switchMap(() => this.debtorService.findAll()));

  openFormDebtor() {
    const modalRef = this.modalService.open(
      FormDebtorComponent,
      'Cadastro de Devedor',
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
