"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Pencil, Plus, Trash2, WalletCards } from "lucide-react";
import { UiModal } from "@/components/ui-modal";
import {
  deleteFinancialEntry,
  getFinancialEntriesByType,
  getFinancialEntriesSummary,
  getFinancialEntryDisplayStatus,
  numberToCurrency,
  saveFinancialEntry,
  StoredFinancialEntry,
  updateFinancialEntry,
  updateFinancialEntryStatus,
} from "@/lib/browser-store";
import {
  accountsPayableCategories,
  accountsReceivableCategories,
  paymentMethods,
  payableStatuses,
  receivableStatuses,
} from "@/lib/select-options";

type AccountMode = "Pagar" | "Receber";

type FormState = {
  description: string;
  personName: string;
  reference: string;
  category: string;
  amount: string;
  dueDate: string;
  settledAt: string;
  status: StoredFinancialEntry["status"];
  paymentMethod: string;
  notes: string;
};

const emptyPayableForm: FormState = {
  description: "",
  personName: "",
  reference: "",
  category: "Peças e produtos",
  amount: "",
  dueDate: "",
  settledAt: "",
  status: "Pendente",
  paymentMethod: "Pix",
  notes: "",
};

const emptyReceivableForm: FormState = {
  description: "",
  personName: "",
  reference: "",
  category: "Ordem de serviço",
  amount: "",
  dueDate: "",
  settledAt: "",
  status: "Pendente",
  paymentMethod: "Pix",
  notes: "",
};

const inputClass = "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white";
const labelClass = "grid gap-2 text-sm font-bold text-slate-700";

function statusClassName(status: StoredFinancialEntry["status"]) {
  const styles: Record<StoredFinancialEntry["status"], string> = {
    Pendente: "bg-amber-50 text-amber-700",
    Pago: "bg-emerald-50 text-emerald-700",
    Recebido: "bg-emerald-50 text-emerald-700",
    Vencido: "bg-rose-50 text-rose-700",
    Cancelado: "bg-slate-100 text-slate-600",
  };

  return styles[status];
}

function currentDate() {
  return new Date().toISOString().slice(0, 10);
}

function makeInitialForm(mode: AccountMode): FormState {
  return mode === "Pagar" ? emptyPayableForm : emptyReceivableForm;
}

export function FinanceAccountsClient({ mode }: { mode: AccountMode }) {
  const [entries, setEntries] = useState<StoredFinancialEntry[]>([]);
  const [statusFilter, setStatusFilter] = useState<"Todos" | StoredFinancialEntry["status"]>("Todos");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(() => makeInitialForm(mode));
  const [isFormOpen, setIsFormOpen] = useState(false);

  const isPayable = mode === "Pagar";
  const categories = isPayable ? accountsPayableCategories : accountsReceivableCategories;
  const statuses = isPayable ? payableStatuses : receivableStatuses;
  const settledStatus: StoredFinancialEntry["status"] = isPayable ? "Pago" : "Recebido";
  const personLabel = isPayable ? "Fornecedor / favorecido" : "Cliente / pagador";
  const referenceLabel = isPayable ? "Referência interna" : "OS / referência";
  const title = isPayable ? "Contas a pagar" : "Contas a receber";
  const emptyMessage = isPayable
    ? "Nenhuma conta a pagar cadastrada ainda. Lance despesas, boletos, fornecedores ou comissões para acompanhar o caixa."
    : "Nenhuma conta a receber cadastrada ainda. Lance recebíveis de OS, lavagens, peças ou contratos para acompanhar entradas futuras.";

  function reload() {
    setEntries(getFinancialEntriesByType(mode));
  }

  useEffect(() => {
    reload();
  }, [mode]);

  const summary = useMemo(() => getFinancialEntriesSummary(mode), [entries, mode]);

  const filteredEntries = entries.filter((entry) => {
    const displayStatus = getFinancialEntryDisplayStatus(entry);
    return statusFilter === "Todos" || displayStatus === statusFilter;
  });

  const cards = [
    { label: "Total previsto", value: numberToCurrency(summary.total), icon: WalletCards },
    { label: isPayable ? "Pendente de pagamento" : "Pendente de recebimento", value: numberToCurrency(summary.pending), icon: CalendarDays },
    { label: isPayable ? "Pago" : "Recebido", value: numberToCurrency(summary.settled), icon: CheckCircle2 },
    { label: "Vencido", value: numberToCurrency(summary.overdue), icon: CalendarDays },
  ];

  function updateForm<K extends keyof FormState>(name: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function resetForm() {
    setEditingId(null);
    setForm(makeInitialForm(mode));
  }

  function closeForm() {
    resetForm();
    setIsFormOpen(false);
  }

  function openNewForm() {
    resetForm();
    setIsFormOpen(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const settledAt = form.status === "Pago" || form.status === "Recebido" ? form.settledAt || currentDate() : "";

    const payload = {
      type: mode,
      description: form.description,
      personName: form.personName,
      reference: form.reference,
      category: form.category,
      amount: form.amount,
      dueDate: form.dueDate,
      settledAt,
      status: form.status,
      paymentMethod: form.paymentMethod,
      notes: form.notes,
    };

    if (editingId) updateFinancialEntry(editingId, payload);
    else saveFinancialEntry(payload);

    reload();
    closeForm();
  }

  function handleEdit(entry: StoredFinancialEntry) {
    setEditingId(entry.id);
    setForm({
      description: entry.description,
      personName: entry.personName ?? "",
      reference: entry.reference ?? "",
      category: entry.category,
      amount: entry.amount,
      dueDate: entry.dueDate,
      settledAt: entry.settledAt ?? "",
      status: entry.status,
      paymentMethod: entry.paymentMethod,
      notes: entry.notes,
    });
    setIsFormOpen(true);
  }

  function handleDelete(id: string) {
    deleteFinancialEntry(id);
    if (editingId === id) closeForm();
    reload();
  }

  function handleStatusChange(id: string, status: StoredFinancialEntry["status"]) {
    updateFinancialEntryStatus(id, status);
    reload();
  }

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
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-blue-700">Lançamentos financeiros</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">Cadastre e edite lançamentos em modal, mantendo a tela principal focada em indicadores e lista.</p>
          </div>
          <button type="button" onClick={openNewForm} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Novo lançamento
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-black">Lista de lançamentos</h2>
            <p className="mt-2 text-sm text-slate-600">Cadastre, edite, exclua e altere status sem sair da tela.</p>
          </div>
          <label className={labelClass}>
            Filtrar status
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "Todos" | StoredFinancialEntry["status"])} className={inputClass}>
              <option>Todos</option>
              {statuses.map((status) => <option key={status}>{status}</option>)}
            </select>
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>{["Descrição", personLabel, "Categoria", "Valor", "Vencimento", "Status", "Forma", "Ações"].map((column) => <th key={column} className="px-5 py-4 font-black">{column}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEntries.length > 0 ? filteredEntries.map((entry) => {
                const displayStatus = getFinancialEntryDisplayStatus(entry);
                return (
                  <tr key={entry.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4"><p className="font-black text-slate-950">{entry.description}</p><p className="mt-1 text-xs text-slate-500">{entry.reference || "Sem referência"}</p></td>
                    <td className="px-5 py-4 text-slate-700">{entry.personName || "-"}</td>
                    <td className="px-5 py-4 text-slate-700">{entry.category}</td>
                    <td className="px-5 py-4 font-black text-slate-950">{entry.amount}</td>
                    <td className="px-5 py-4 text-slate-700">{entry.dueDate || "-"}</td>
                    <td className="px-5 py-4"><select value={entry.status} onChange={(event) => handleStatusChange(entry.id, event.target.value as StoredFinancialEntry["status"])} className={`rounded-full px-3 py-2 text-xs font-black outline-none ${statusClassName(displayStatus)}`}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></td>
                    <td className="px-5 py-4 text-slate-700">{entry.paymentMethod || "-"}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => handleStatusChange(entry.id, settledStatus)} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-100"><CheckCircle2 className="h-4 w-4" />{settledStatus}</button>
                        <button type="button" onClick={() => handleEdit(entry)} className="inline-flex items-center gap-2 rounded-2xl bg-blue-50 px-3 py-2 text-xs font-black text-blue-700 hover:bg-blue-100"><Pencil className="h-4 w-4" />Editar</button>
                        <button type="button" onClick={() => handleDelete(entry.id)} className="inline-flex items-center gap-2 rounded-2xl bg-rose-50 px-3 py-2 text-xs font-black text-rose-700 hover:bg-rose-100"><Trash2 className="h-4 w-4" />Excluir</button>
                      </div>
                    </td>
                  </tr>
                );
              }) : <tr><td colSpan={8} className="px-5 py-10 text-center text-slate-500">{emptyMessage}</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <UiModal open={isFormOpen} title={editingId ? `Editar ${title.toLowerCase()}` : `Novo lançamento - ${title}`} description="Use selects nos campos enumeráveis e mantenha o controle financeiro simples para o MVP localStorage." onClose={closeForm}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>Descrição<input required value={form.description} onChange={(event) => updateForm("description", event.target.value)} placeholder={isPayable ? "Ex: Boleto fornecedor de peças" : "Ex: OS troca de óleo"} className={inputClass} /></label>
            <label className={labelClass}>{personLabel}<input value={form.personName} onChange={(event) => updateForm("personName", event.target.value)} placeholder={isPayable ? "Ex: Auto Peças Araras" : "Ex: João Pereira"} className={inputClass} /></label>
            <label className={labelClass}>{referenceLabel}<input value={form.reference} onChange={(event) => updateForm("reference", event.target.value)} placeholder={isPayable ? "Ex: NF 12345" : "Ex: OS-2001"} className={inputClass} /></label>
            <label className={labelClass}>Categoria<select value={form.category} onChange={(event) => updateForm("category", event.target.value)} className={inputClass}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className={labelClass}>Status<select value={form.status} onChange={(event) => updateForm("status", event.target.value as StoredFinancialEntry["status"])} className={inputClass}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
            <label className={labelClass}>Valor<input required value={form.amount} onChange={(event) => updateForm("amount", event.target.value)} placeholder="Ex: R$ 250,00" inputMode="decimal" className={inputClass} /></label>
            <label className={labelClass}>Vencimento<input required type="date" value={form.dueDate} onChange={(event) => updateForm("dueDate", event.target.value)} className={inputClass} /></label>
            <label className={labelClass}>{isPayable ? "Data de pagamento" : "Data de recebimento"}<input type="date" value={form.settledAt} onChange={(event) => updateForm("settledAt", event.target.value)} className={inputClass} /></label>
            <label className={labelClass}>Forma<select value={form.paymentMethod} onChange={(event) => updateForm("paymentMethod", event.target.value)} className={inputClass}>{paymentMethods.map((method) => <option key={method}>{method}</option>)}</select></label>
          </div>
          <label className={`${labelClass} mt-4`}>Observações<textarea value={form.notes} onChange={(event) => updateForm("notes", event.target.value)} rows={4} placeholder="Condição de pagamento, negociação, parcela, baixa manual ou observação interna." className="resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={closeForm} className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">Cancelar</button>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700"><Plus className="h-4 w-4" />{editingId ? "Salvar alterações" : "Cadastrar"}</button>
          </div>
        </form>
      </UiModal>
    </div>
  );
}
