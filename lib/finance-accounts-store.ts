"use client";

export type FinancialAccountType = "Pagar" | "Receber";
export type FinancialAccountStatus = "Pendente" | "Pago" | "Recebido" | "Vencido" | "Cancelado";

export type StoredFinancialAccount = {
  id: string;
  type: FinancialAccountType;
  description: string;
  category: string;
  amount: string;
  dueDate: string;
  status: FinancialAccountStatus;
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

const financialEntriesKey = "ajb-autoflow-financial-entries";

function readList<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(key);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function writeList<T>(key: string, value: T[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function todayDateOnly() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function parseDateOnly(value: string) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function isAccountOverdue(entry: StoredFinancialAccount) {
  if (entry.status !== "Pendente") return false;
  const dueDate = parseDateOnly(entry.dueDate);
  if (!dueDate) return false;
  return dueDate < todayDateOnly();
}

export function currencyToNumber(value: string) {
  const parsed = Number(value.replace("R$", "").replace(/\./g, "").replace(",", ".").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

export function numberToCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function listFinancialAccounts() {
  return readList<StoredFinancialAccount>(financialEntriesKey);
}

export function getFinancialAccountsByType(type: StoredFinancialAccount["type"]) {
  return listFinancialAccounts().filter((entry) => entry.type === type);
}

export function saveFinancialAccount(entry: Omit<StoredFinancialAccount, "id" | "createdAt" | "updatedAt">) {
  const record: StoredFinancialAccount = { ...entry, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  writeList(financialEntriesKey, [record, ...listFinancialAccounts()]);
  return record;
}

export function updateFinancialAccount(id: string, entry: Omit<StoredFinancialAccount, "id" | "createdAt" | "updatedAt">) {
  let updatedRecord: StoredFinancialAccount | undefined;
  const updated = listFinancialAccounts().map((current) => {
    if (current.id !== id) return current;
    updatedRecord = {
      ...current,
      ...entry,
      updatedAt: new Date().toISOString(),
      settledAt: entry.status === "Pago" || entry.status === "Recebido" ? entry.settledAt || current.settledAt || new Date().toISOString().slice(0, 10) : entry.settledAt,
    };
    return updatedRecord;
  });
  writeList(financialEntriesKey, updated);
  return updatedRecord;
}

export function deleteFinancialAccount(id: string) {
  const updated = listFinancialAccounts().filter((entry) => entry.id !== id);
  writeList(financialEntriesKey, updated);
  return updated;
}

export function updateFinancialAccountStatus(id: string, status: StoredFinancialAccount["status"]) {
  const updated = listFinancialAccounts().map((entry) => {
    if (entry.id !== id) return entry;
    const settledAt = status === "Pago" || status === "Recebido" ? new Date().toISOString().slice(0, 10) : entry.settledAt;
    return { ...entry, status, settledAt, updatedAt: new Date().toISOString() };
  });
  writeList(financialEntriesKey, updated);
  return updated.find((entry) => entry.id === id);
}

export function getFinancialAccountDisplayStatus(entry: StoredFinancialAccount): StoredFinancialAccount["status"] {
  if (isAccountOverdue(entry)) return "Vencido";
  return entry.status;
}

export function getFinancialAccountsSummary(type: StoredFinancialAccount["type"]): FinancialAccountSummary {
  const entries = getFinancialAccountsByType(type);
  return entries.reduce<FinancialAccountSummary>((summary, entry) => {
    const value = currencyToNumber(entry.amount);
    const displayStatus = getFinancialAccountDisplayStatus(entry);

    if (displayStatus === "Cancelado") {
      summary.cancelled += value;
    } else {
      summary.total += value;
    }

    if (displayStatus === "Pendente") summary.pending += value;
    if (displayStatus === "Vencido") summary.overdue += value;
    if (displayStatus === "Pago" || displayStatus === "Recebido") summary.settled += value;

    summary.count += 1;
    return summary;
  }, { total: 0, pending: 0, settled: 0, overdue: 0, cancelled: 0, count: 0 });
}
