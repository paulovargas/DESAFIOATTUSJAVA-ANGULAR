import { AsyncPipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Dashboard, DashboardChartItem } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-home-page',
  imports: [AsyncPipe, CurrencyPipe, DecimalPipe],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  private readonly dashboardService = inject(DashboardService);

  readonly dashboard$ = this.dashboardService.getDashboard();

  barWidth(item: DashboardChartItem) {
    return Math.max(item.percentage || 0, item.count > 0 ? 3 : 0);
  }

  proposalAcceptanceRate(dashboard: Dashboard) {
    if (!dashboard.totalProposals) {
      return 0;
    }
    return (dashboard.acceptedProposals / dashboard.totalProposals) * 100;
  }

  statusClass(status: string) {
    return status.toLowerCase().replace('_', '-');
  }
}
