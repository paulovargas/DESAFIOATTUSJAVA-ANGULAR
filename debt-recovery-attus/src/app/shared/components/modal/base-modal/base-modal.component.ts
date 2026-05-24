import { NgComponentOutlet } from '@angular/common';
import { Component, Input, Type } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'base-modal',
	standalone: true,
	imports: [NgComponentOutlet],
	templateUrl: './base-modal.component.html',
})
export class BaseModalComponent {
	@Input() title = '';
	@Input() component?: Type<unknown>;
	@Input() data?: Record<string, unknown>;

	constructor(public activeModal: NgbActiveModal) {}
}
