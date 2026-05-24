import { Injectable, Type } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseModalComponent } from './base-modal/base-modal.component';

@Injectable({
  providedIn: 'root'
})
export class BaseModalService {
  constructor(private modalService: NgbModal) {}

  open(
    component: Type<any>,
    title: string,
    data?: any
  ) {

    (document.activeElement as HTMLElement)?.blur();

    const modalRef = this.modalService.open(
      BaseModalComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'lg',
        centered: true,
        container: 'body',
        scrollable: true,
        windowClass: 'app-modal-window',
        backdropClass: 'app-modal-backdrop'
      },

    );

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.component = component;
    modalRef.componentInstance.data = data;

    return modalRef;
  }
}
