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
  private readonly sortBy$ = new BehaviorSubject<string>('companyName');
  private readonly page$ = new BehaviorSubject<number>(1);
  private readonly pageSize$ = new BehaviorSubject<number>(10);

  clients$: Observable<Client[]>;
  filteredClients$: Observable<Client[]>;
  sortedClients$: Observable<Client[]>;
  paginatedClients$: Observable<Client[]>;
  totalClients$: Observable<number>;

	constructor(
    private clientService: ClientService,
    private modalService: BaseModalService,
  ) {
		this.clients$ = this.refresh$.pipe(switchMap(() => this.clientService.findAll()));
    this.filteredClients$ = combineLatest([this.clients$, this.searchTerm$]).pipe(
      map(([clients, searchTerm]) => this.filterClients(clients, searchTerm))
    );
    this.sortedClients$ = combineLatest([this.filteredClients$, this.sortBy$]).pipe(
      map(([clients, sortBy]) => this.sortClients(clients, sortBy))
    );
    this.paginatedClients$ = combineLatest([this.sortedClients$, this.page$, this.pageSize$]).pipe(
      map(([clients, page, pageSize]) => {
        const start = (page - 1) * pageSize;
        return clients.slice(start, start + pageSize);
      })
    );
    this.totalClients$ = this.filteredClients$.pipe(map((clients) => clients.length));
	}

  get searchTerm(): string {
    return this.searchTerm$.value;
  }

  set searchTerm(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
    this.page$.next(1);
  }

  get page(): number {
    return this.page$.value;
  }

  set page(page: number) {
    this.page$.next(page);
  }

  get pageSize(): number {
    return this.pageSize$.value;
  }

  set pageSize(pageSize: number) {
    this.pageSize$.next(Number(pageSize));
    this.page$.next(1);
  }

  get sortBy(): string {
    return this.sortBy$.value;
  }

  set sortBy(sortBy: string) {
    this.sortBy$.next(sortBy);
    this.page$.next(1);
  }

  openFormClient(client?: Client) {
		const modalRef = this.modalService.open(
      FormClientComponent,
      client ? 'Edi\u00e7\u00e3o de Cliente' : 'Cadastro de Cliente',
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

  private sortClients(clients: Client[], sortBy: string): Client[] {
    return [...clients].sort((first, second) => {
      if (sortBy === 'id') {
        return Number(first.id) - Number(second.id);
      }

      const firstValue = String(first[sortBy as keyof Client] || '').toLowerCase();
      const secondValue = String(second[sortBy as keyof Client] || '').toLowerCase();
      return firstValue.localeCompare(secondValue);
    });
  }
}
