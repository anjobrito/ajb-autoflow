export type AccountType = "Pagar" | "Receber";

export type AccountStatus = "Pendente" | "Pago" | "Recebido" | "Vencido" | "Cancelado";

export type FinancialAccount = {
  id: string;
  type: AccountType;
  description: string;
  category: string;
  amount: string;
  dueDate: string;
  status: AccountStatus;
  paymentMethod: string;
  notes: string;
  createdAt: string;
  updatedAt?: string;
  personName?: string;
  reference?: string;
  settledAt?: string;
};

export type FinancialAccountSummary = {
  total: number;
  pending: number;
  settled: number;
  overdue: number;
  cancelled: number;
  count: number;
};
