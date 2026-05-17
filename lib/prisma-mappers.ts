import { FinancialEntryStatus, FinancialEntryType, WorkOrderStatus } from "@prisma/client";

export function mapWorkOrderStatusToLabel(status: WorkOrderStatus) {
  const labels: Record<WorkOrderStatus, string> = {
    OPEN: "Aberta",
    IN_PROGRESS: "Em andamento",
    WAITING_PARTS: "Aguardando peças",
    READY_FOR_PICKUP: "Pronta para retirada",
    DELIVERED: "Entregue",
    CANCELED: "Cancelada",
  };

  return labels[status];
}

export function mapFinancialEntryTypeToLabel(type: FinancialEntryType) {
  return type === "PAYABLE" ? "Pagar" : "Receber";
}

export function mapFinancialEntryStatusToLabel(status: FinancialEntryStatus) {
  const labels: Record<FinancialEntryStatus, string> = {
    PENDING: "Pendente",
    PAID: "Pago",
    RECEIVED: "Recebido",
    OVERDUE: "Vencido",
    CANCELED: "Cancelado",
  };

  return labels[status];
}

export function currencyToDecimal(value: string) {
  const parsed = Number(value.replace("R$", "").replace(/\./g, "").replace(",", ".").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

export function decimalToCurrency(value: number | { toNumber: () => number }) {
  const numberValue = typeof value === "number" ? value : value.toNumber();
  return numberValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
