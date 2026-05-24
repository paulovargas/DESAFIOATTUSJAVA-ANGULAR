import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { BaseModalService } from '../../../../shared/components/modal/base-modal.service';
import { FormClientComponent } from '../../components/form-client/form-client.component';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-page',
  imports: [FormsModule, AsyncPipe, NgbHighlight, NgbPagination],
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css'],
})
export class ClientPageComponent {
  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  clients$: Observable<Client[]>;
  searchTerm = '';

	constructor(
    private clientService: ClientService,
    private modalService: BaseModalService,
  ) {
		this.clients$ = this.refresh$.pipe(switchMap(() => this.clientService.findAll()));
	}

  openFormClient(client?: Client) {
		const modalRef = this.modalService.open(
      FormClientComponent,
      client ? 'Edicao de Cliente' : 'Cadastro de Cliente',
	    { client }
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
