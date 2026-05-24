export interface DashboardChartItem {
  label: string;
  count: number;
  amount: number;
  percentage: number;
}

export interface Dashboard {
  totalDebtAmount: number;
  overdueDebtAmount: number;
  recoveredAmount: number;
  averageDebtAmount: number;
  recoveryRate: number;
  totalDebts: number;
  overdueDebts: number;
  pendingDebts: number;
  negotiatedDebts: number;
  totalProposals: number;
  acceptedProposals: number;
  rejectedProposals: number;
  analysisProposals: number;
  debtsByStatus: DashboardChartItem[];
  proposalsByStatus: DashboardChartItem[];
  recoveryByDebtor: DashboardChartItem[];
}
