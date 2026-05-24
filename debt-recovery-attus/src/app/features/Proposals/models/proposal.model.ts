export interface Proposal {
  id: number;
  debtId: number;
  debtorName: string;
  debtDescription: string;
  originalAmount: number;
  offeredAmount: number;
  installments: number;
  status: string;
  createdAt: string;
}
