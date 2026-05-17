"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { findCommissionById, listFinancialEntries, StoredCommission, StoredFinancialEntry } from "@/lib/browser-store";

function formatDateTime(value?: string) {
  if (!value) return "Não registrado";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function StatusBadge({ status }: { status: string }) {
  const className = status === "Paga"
    ? "bg-emerald-100 text-emerald-700"
    : status === "Cancelada"
      ? "bg-rose-100 text-rose-700"
      : "bg-amber-100 text-amber-700";

  return <span className={`rounded-full px-3 py-1 text-xs font-black ${className}`}>{status}</span>;
}

export function CommissionDetailClient({ id }: { id: string }) {
  const [commission, setCommission] = useState<StoredCommission | null>(null);
  const [financialEntries, setFinancialEntries] = useState<StoredFinancialEntry[]>([]);

  useEffect(() => {
    setCommission(findCommissionById(id) ?? null);
    setFinancialEntries(listFinancialEntries());
  }, [id]);

  const financialEntry = useMemo(() => {
    if (!commission?.financialEntryId) return undefined;
    return financialEntries.find((entry) => entry.id === commission.financialEntryId);
  }, [commission, financialEntries]);

  if (!commission) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <p className="text-xl font-black text-slate-950">Comissão não encontrada</p>
        <p className="mt-2 text-sm text-slate-600">O lançamento pode ter sido excluído ou ainda não existe neste navegador.</p>
        <Link href="/comissoes" className="mt-5 inline-flex rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white">Voltar</Link>
      </div>
    );
  }

  const details = [
    ["Funcionário", commission.employeeName || "Funcionário a definir"],
    ["Base", commission.targetType],
    ["Item", commission.targetName],
    ["Valor base", commission.baseAmount || "Não informado"],
    ["Regra", `${commission.valueType} • ${commission.value}`],
    ["Comissão calculada", commission.calculatedAmount || "Não calculada"],
    ["Data de referência", commission.referenceDate || "Não informada"],
    ["Origem", commission.sourceWorkOrderCode || "Lançamento manual"],
    ["Conta a pagar", financialEntry ? `${financialEntry.description} • ${financialEntry.status}` : "Não vinculada"],
    ["Observações", commission.notes || "Sem observações"],
  ];

  const timeline = [
    ["Comissão criada", formatDateTime(commission.createdAt)],
    ["Última atualização", formatDateTime(commission.updatedAt)],
    ["Pagamento", commission.paidAt ? formatDateTime(commission.paidAt) : "Ainda não paga"],
    ["Vínculo financeiro", financialEntry ? `Conta a pagar ${financialEntry.status} com vencimento ${financialEntry.dueDate}` : "Sem vínculo financeiro encontrado"],
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="grid gap-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-950">{commission.employeeName}</h2>
              <p className="mt-2 text-sm font-semibold text-slate-600">{commission.targetType} • {commission.targetName}</p>
            </div>
            <StatusBadge status={commission.status || "Pendente"} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {details.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                <p className="mt-2 font-black text-slate-950">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/comissoes/${commission.id}/editar`} className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Editar comissão</Link>
            {commission.sourceWorkOrderId ? <Link href={`/ordens-servico/${commission.sourceWorkOrderId}`} className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-950 hover:bg-slate-50">Abrir OS</Link> : null}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">Histórico</h2>
          <div className="mt-6 grid gap-4">
            {timeline.map(([title, description], index) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">{index + 1}</div>
                <div>
                  <p className="font-black text-slate-950">{title}</p>
                  <p className="text-sm text-slate-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm font-bold text-blue-300">Leitura gerencial</p>
        <h2 className="mt-2 text-2xl font-black">Comissão controlada com rastreabilidade.</h2>
        <p className="mt-4 text-sm leading-6 text-slate-300">Esse detalhe ajuda a auditar o cálculo, a origem da comissão e o reflexo financeiro em contas a pagar.</p>
        <div className="mt-6 grid gap-3 text-sm text-slate-200">
          <div className="rounded-2xl bg-white/10 p-4">Calculado: {commission.calculatedAmount || "R$ 0,00"}</div>
          <div className="rounded-2xl bg-white/10 p-4">Origem: {commission.sourceWorkOrderCode || "Manual"}</div>
          <div className="rounded-2xl bg-white/10 p-4">Financeiro: {financialEntry?.status || "Não vinculado"}</div>
        </div>
      </div>
    </div>
  );
}
