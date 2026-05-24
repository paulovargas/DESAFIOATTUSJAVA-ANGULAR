import { AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, catchError, map, of, startWith, switchMap } from 'rxjs';

import { Dashboard, DashboardChartItem } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';

interface DashboardViewState {
  dashboard?: Dashboard;
  error?: string;
  loading: boolean;
  updatedAt?: Date;
}

@Component({
  selector: 'app-home-page',
  imports: [AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  private readonly dashboardService = inject(DashboardService);
  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  readonly dashboardState$ = this.refresh$.pipe(
    switchMap(() =>
      this.dashboardService.getDashboard().pipe(
        map((dashboard): DashboardViewState => ({
          dashboard,
          loading: false,
          updatedAt: new Date(),
        })),
        startWith({ loading: true } as DashboardViewState),
        catchError(() =>
          of({
            error: 'Nao foi possivel carregar os indicadores do dashboard.',
            loading: false,
          } as DashboardViewState)
        )
      )
    )
  );

  refreshDashboard() {
    this.refresh$.next();
  }

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

  overdueRate(dashboard: Dashboard) {
    if (!dashboard.totalDebts) {
      return 0;
    }
    return (dashboard.overdueDebts / dashboard.totalDebts) * 100;
  }

  openDebtAmount(dashboard: Dashboard) {
    return Math.max((dashboard.totalDebtAmount || 0) - (dashboard.recoveredAmount || 0), 0);
  }

  proposalConversionGap(dashboard: Dashboard) {
    return Math.max(100 - this.proposalAcceptanceRate(dashboard), 0);
  }

  mainFocus(dashboard: Dashboard) {
    if (dashboard.overdueDebts > 0) {
      return `${dashboard.overdueDebts} dividas vencidas precisam de priorizacao.`;
    }

    if (dashboard.analysisProposals > 0) {
      return `${dashboard.analysisProposals} propostas aguardam analise.`;
    }

    return 'Carteira sem pendencias criticas no momento.';
  }
}
