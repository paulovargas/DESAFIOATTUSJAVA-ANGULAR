import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
	NgbNav,
	NgbNavItem,
	NgbNavLinkButton,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
		NgbNav,
		NgbNavItem,
		NgbNavLinkButton,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'debt-recovery-attus';
  active = 'top';
}
