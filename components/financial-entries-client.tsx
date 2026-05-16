"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, CheckCircle2, ClockAlert } from "lucide-react";
import { currencyToNumber, listFinancialEntries, numberToCurrency, StoredFinancialEntry, updateFinancialEntryStatus } from "@/lib/browser-store";
import { financialEntryStatuses } from "@/lib/select-options";

function isOverdue(entry: StoredFinancialEntry) {
  if (!entry.dueDate || entry.status === "Pago" || entry.status === "Recebido" || entry.status === "Cancelado") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(`${entry.dueDate}T00:00:00`);
  return dueDate < today || entry.status === "Vencido";
}

function formatDate(value: string) {
  if (!value) return "-";
  return new Date(`${value}T00:00:00`).toLocaleDateString("pt-BR");
}

function statusBadgeClass(status: StoredFinancialEntry["status"], overdue: boolean) {
  if (overdue) return "bg-red-50 text-red-700";
  if (status === "Pago" || status === "Recebido") return "bg-emerald-50 text-emerald-700";
  if (status === "Cancelado") return "bg-slate-100 text-slate-500";
  return "bg-blue-50 text-blue-700";
}

export function FinancialEntriesClient() {
  const [entries, setEntries] = useState<StoredFinancialEntry[]>([]);

  function refreshEntries() {
    setEntries(listFinancialEntries());
  }

  useEffect(() => {
    refreshEntries();
  }, []);

  const summary = useMemo(() => {
    return entries.reduce(
      (acc, entry) => {
        const amount = currencyToNumber(entry.amount);
        const settled = entry.status === "Pago" || entry.status === "Recebido";
        const overdue = isOverdue(entry);

        if (entry.type === "Pagar" && !settled && entry.status !== "Cancelado") acc.payable += amount;
        if (entry.type === "Receber" && !settled && entry.status !== "Cancelado") acc.receivable += amount;
        if (overdue) acc.overdue += amount;
        if (settled) acc.settled += amount;

        return acc;
      },
      { payable: 0, receivable: 0, overdue: 0, settled: 0 },
    );
  }, [entries]);

  function handleStatusChange(id: string, status: StoredFinancialEntry["status"]) {
    updateFinancialEntryStatus(id, status);
    refreshEntries();
  }

  const cards = [
    { label: "A pagar", value: numberToCurrency(summary.payable), icon: ArrowDownCircle, helper: "Saídas pendentes" },
    { label: "A receber", value: numberToCurrency(summary.receivable), icon: ArrowUpCircle, helper: "Entradas pendentes" },
    { label: "Vencido", value: numberToCurrency(summary.overdue), icon: ClockAlert, helper: "Pendências em atraso" },
    { label: "Pago/recebido", value: numberToCurrency(summary.settled), icon: CheckCircle2, helper: "Lançamentos liquidados" },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{card.label}</p>
                <Icon className="h-5 w-5 text-blue-700" />
              </div>
              <p className="mt-4 text-3xl font-black">{card.value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-400">{card.helper}</p>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-xl font-black">Lançamentos financeiros</h2>
          <p className="mt-2 text-sm text-slate-600">Controle operacional de vencimentos, formas de pagamento e situação das contas cadastradas no navegador.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {["Tipo", "Descrição", "Categoria", "Valor", "Vencimento", "Forma", "Status", "Observações"].map((column) => (
                  <th key={column} className="px-5 py-4 font-black">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {entries.length > 0 ? entries.map((entry) => {
                const overdue = isOverdue(entry);
                return (
                  <tr key={entry.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4"><span className={entry.type === "Receber" ? "font-black text-emerald-700" : "font-black text-red-700"}>{entry.type}</span></td>
                    <td className="px-5 py-4 font-black text-slate-950">{entry.description}</td>
                    <td className="px-5 py-4 text-slate-700">{entry.category}</td>
                    <td className="px-5 py-4 text-slate-700">{entry.amount}</td>
                    <td className="px-5 py-4 text-slate-700">{formatDate(entry.dueDate)}</td>
                    <td className="px-5 py-4 text-slate-700">{entry.paymentMethod}</td>
                    <td className="px-5 py-4">
                      <div className="grid gap-2">
                        <span className={`w-fit rounded-full px-3 py-1 text-xs font-black ${statusBadgeClass(entry.status, overdue)}`}>{overdue ? "Vencido" : entry.status}</span>
                        <select value={entry.status} onChange={(event) => handleStatusChange(entry.id, event.target.value as StoredFinancialEntry["status"])} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold outline-none focus:border-blue-500 focus:bg-white">
                          {financialEntryStatuses.map((status) => <option key={status}>{status}</option>)}
                        </select>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-700">{entry.notes || "-"}</td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-slate-500">Nenhum lançamento cadastrado ainda. Crie uma conta a pagar ou a receber para iniciar o controle operacional.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
