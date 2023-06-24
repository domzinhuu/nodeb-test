interface ValueAndDate {
  date: string;
  amount: number;
}

interface Acquirer {
  acquirer: string;
  ultimoPagamento: string;
  valorPagar: number;
  valorReceber: number;
  valorTotal: number;
}

interface ConsolidateDashboard {
  acquirers: Acquirer[];
  document: string;
  totalPayValue: number;
  totalValue: number;
}

export interface DashboardData {
  agendaFutura: number;
  atual: ValueAndDate;
  proximo: ValueAndDate;
  consolidateData: ConsolidateDashboard[];
  json: string;
  ultimoPagamento: string;
}
