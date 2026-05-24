import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, switchMap } from 'rxjs';

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
  private readonly searchTerm$ = new BehaviorSubject<string>('');

  clients$: Observable<Client[]>;
  filteredClients$: Observable<Client[]>;

	constructor(
    private clientService: ClientService,
    private modalService: BaseModalService,
  ) {
		this.clients$ = this.refresh$.pipe(switchMap(() => this.clientService.findAll()));
    this.filteredClients$ = combineLatest([this.clients$, this.searchTerm$]).pipe(
      map(([clients, searchTerm]) => this.filterClients(clients, searchTerm))
    );
	}

  get searchTerm(): string {
    return this.searchTerm$.value;
  }

  set searchTerm(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
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

  private filterClients(clients: Client[], searchTerm: string): Client[] {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return clients;
    }

    const numericTerm = this.onlyNumbers(term);

    return clients.filter((client) => {
      const companyName = client.companyName?.toLowerCase() ?? '';
      const cnpj = client.cnpj?.toLowerCase() ?? '';
      const numericCnpj = this.onlyNumbers(cnpj);

      return (
        companyName.includes(term) ||
        cnpj.includes(term) ||
        (!!numericTerm && numericCnpj.includes(numericTerm))
      );
    });
  }

  private onlyNumbers(value: string): string {
    return value.replace(/\D/g, '');
  }
}
