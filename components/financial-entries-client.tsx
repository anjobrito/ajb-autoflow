"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, CheckCircle2, ClockAlert } from "lucide-react";
import { currencyToNumber, listFinancialEntries, numberToCurrency, StoredFinancialEntry, updateFinancialEntryStatus } from "@/lib/browser-store";
import { financialEntryCategories, financialEntryStatuses, financialEntryTypes } from "@/lib/select-options";

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

function normalizeSearch(value: string) {
  return value.trim().toLocaleLowerCase("pt-BR");
}

export function FinancialEntriesClient() {
  const [entries, setEntries] = useState<StoredFinancialEntry[]>([]);
  const [typeFilter, setTypeFilter] = useState<"Todos" | StoredFinancialEntry["type"]>("Todos");
  const [statusFilter, setStatusFilter] = useState<"Todos" | StoredFinancialEntry["status"]>("Todos");
  const [categoryFilter, setCategoryFilter] = useState("Todas");
  const [overdueFilter, setOverdueFilter] = useState<"Todos" | "Somente vencidas" | "Ocultar vencidas">("Todos");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  const categoryOptions = useMemo(() => {
    const storedCategories = entries.map((entry) => entry.category).filter(Boolean);
    return ["Todas", ...Array.from(new Set([...financialEntryCategories, ...storedCategories]))];
  }, [entries]);

  const filteredEntries = useMemo(() => {
    const search = normalizeSearch(searchTerm);

    return entries.filter((entry) => {
      const overdue = isOverdue(entry);
      const searchableText = normalizeSearch(`${entry.description} ${entry.category} ${entry.paymentMethod} ${entry.notes} ${entry.amount}`);

      if (typeFilter !== "Todos" && entry.type !== typeFilter) return false;
      if (statusFilter !== "Todos" && entry.status !== statusFilter) return false;
      if (categoryFilter !== "Todas" && entry.category !== categoryFilter) return false;
      if (overdueFilter === "Somente vencidas" && !overdue) return false;
      if (overdueFilter === "Ocultar vencidas" && overdue) return false;
      if (startDateFilter && (!entry.dueDate || entry.dueDate < startDateFilter)) return false;
      if (endDateFilter && (!entry.dueDate || entry.dueDate > endDateFilter)) return false;
      if (search && !searchableText.includes(search)) return false;

      return true;
    });
  }, [categoryFilter, endDateFilter, entries, overdueFilter, searchTerm, startDateFilter, statusFilter, typeFilter]);

  const hasActiveFilters = typeFilter !== "Todos" || statusFilter !== "Todos" || categoryFilter !== "Todas" || overdueFilter !== "Todos" || Boolean(startDateFilter) || Boolean(endDateFilter) || Boolean(searchTerm.trim());

  function handleStatusChange(id: string, status: StoredFinancialEntry["status"]) {
    updateFinancialEntryStatus(id, status);
    refreshEntries();
  }

  function clearFilters() {
    setTypeFilter("Todos");
    setStatusFilter("Todos");
    setCategoryFilter("Todas");
    setOverdueFilter("Todos");
    setStartDateFilter("");
    setEndDateFilter("");
    setSearchTerm("");
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
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-xl font-black">Lançamentos financeiros</h2>
              <p className="mt-2 text-sm text-slate-600">Controle operacional de vencimentos, formas de pagamento e situação das contas cadastradas no navegador.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">
              Mostrando {filteredEntries.length} de {entries.length} lançamentos
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-b border-slate-100 p-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Tipo
              <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as "Todos" | StoredFinancialEntry["type"])} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white">
                <option>Todos</option>
                {financialEntryTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Status
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "Todos" | StoredFinancialEntry["status"])} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white">
                <option>Todos</option>
                {financialEntryStatuses.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Categoria
              <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white">
                {categoryOptions.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Vencimento
              <select value={overdueFilter} onChange={(event) => setOverdueFilter(event.target.value as "Todos" | "Somente vencidas" | "Ocultar vencidas")} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white">
                <option>Todos</option>
                <option>Somente vencidas</option>
                <option>Ocultar vencidas</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_2fr_auto]">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              De
              <input type="date" value={startDateFilter} onChange={(event) => setStartDateFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Até
              <input type="date" value={endDateFilter} onChange={(event) => setEndDateFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Busca
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Buscar por descrição, categoria, forma, observações ou valor" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white" />
            </label>
            <div className="flex items-end">
              <button type="button" onClick={clearFilters} disabled={!hasActiveFilters} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-600 transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50 xl:w-auto">
                Limpar filtros
              </button>
            </div>
          </div>
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
              {filteredEntries.length > 0 ? filteredEntries.map((entry) => {
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
                  <td colSpan={8} className="px-5 py-10 text-center text-slate-500">
                    {entries.length === 0
                      ? "Nenhum lançamento cadastrado ainda. Crie uma conta a pagar ou a receber para iniciar o controle operacional."
                      : "Nenhum lançamento encontrado para os filtros selecionados. Ajuste os filtros ou limpe a busca para visualizar outras contas."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
