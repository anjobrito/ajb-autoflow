"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { deleteCommission, listCommissions, numberToCurrency, StoredCommission, updateCommissionStatus, currencyToNumber } from "@/lib/browser-store";

function StatusBadge({ status }: { status: string }) {
  const className = status === "Paga"
    ? "bg-emerald-100 text-emerald-700"
    : status === "Cancelada"
      ? "bg-rose-100 text-rose-700"
      : "bg-amber-100 text-amber-700";

  return <span className={`rounded-full px-3 py-1 text-xs font-black ${className}`}>{status}</span>;
}

export function CommissionsClient() {
  const [commissions, setCommissions] = useState<StoredCommission[]>([]);
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [targetFilter, setTargetFilter] = useState("Todas");

  function reloadCommissions() {
    setCommissions(listCommissions());
  }

  useEffect(() => {
    reloadCommissions();
  }, []);

  const filteredRows = useMemo(() => commissions.filter((commission) => {
    const matchesStatus = statusFilter === "Todas" || commission.status === statusFilter;
    const matchesTarget = targetFilter === "Todas" || commission.targetType === targetFilter;
    return matchesStatus && matchesTarget;
  }), [commissions, statusFilter, targetFilter]);

  const employeeSummaries = useMemo(() => {
    const summary = new Map<string, { employeeName: string; pending: number; paid: number; cancelled: number; count: number }>();
    commissions.forEach((commission) => {
      const key = commission.employeeId || commission.employeeName || "Funcionário a definir";
      const current = summary.get(key) || { employeeName: commission.employeeName || "Funcionário a definir", pending: 0, paid: 0, cancelled: 0, count: 0 };
      const amount = currencyToNumber(commission.calculatedAmount ?? "0");
      if (commission.status === "Pendente") current.pending += amount;
      if (commission.status === "Paga") current.paid += amount;
      if (commission.status === "Cancelada") current.cancelled += amount;
      current.count += 1;
      summary.set(key, current);
    });
    return Array.from(summary.values()).sort((a, b) => (b.pending + b.paid) - (a.pending + a.paid));
  }, [commissions]);

  const pendingTotal = commissions.filter((commission) => commission.status === "Pendente").reduce((sum, commission) => sum + currencyToNumber(commission.calculatedAmount ?? "0"), 0);
  const paidTotal = commissions.filter((commission) => commission.status === "Paga").reduce((sum, commission) => sum + currencyToNumber(commission.calculatedAmount ?? "0"), 0);
  const cancelledTotal = commissions.filter((commission) => commission.status === "Cancelada").reduce((sum, commission) => sum + currencyToNumber(commission.calculatedAmount ?? "0"), 0);
  const serviceCount = commissions.filter((commission) => commission.targetType === "Serviço").length;
  const productCount = commissions.filter((commission) => commission.targetType === "Produto/peça").length;
  const washCount = commissions.filter((commission) => commission.targetType === "Lavagem").length;

  function handleStatusChange(id: string, status: "Pendente" | "Paga" | "Cancelada") {
    updateCommissionStatus(id, status);
    reloadCommissions();
  }

  function handleDelete(id: string) {
    deleteCommission(id);
    reloadCommissions();
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Pendente", numberToCurrency(pendingTotal)],
          ["Pago", numberToCurrency(paidTotal)],
          ["Cancelado", numberToCurrency(cancelledTotal)],
          ["Lançamentos", commissions.length],
        ].map(([label, value]) => (
          <div key={label} className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-5 text-sm font-semibold text-blue-900 md:col-span-2">
          Controle as comissões lançadas manualmente ou sugeridas por OS, com valor base, cálculo estimado, status de pagamento e conta a pagar vinculada no financeiro.
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Distribuição</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">Serviços: {serviceCount}</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">Produtos/peças: {productCount}</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">Lavagens: {washCount}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-xl font-black text-slate-950">Resumo por funcionário</h2>
          <p className="mt-2 text-sm text-slate-600">Visão rápida de pendências, pagamentos e cancelamentos por colaborador.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {["Funcionário", "Pendente", "Pago", "Cancelado", "Lançamentos"].map((column) => <th key={column} className="px-5 py-4 font-black">{column}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employeeSummaries.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-sm font-semibold text-slate-500">Nenhum resumo disponível ainda.</td></tr>
              ) : employeeSummaries.map((summary) => (
                <tr key={summary.employeeName} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-black text-slate-950">{summary.employeeName}</td>
                  <td className="px-5 py-4 text-amber-700 font-black">{numberToCurrency(summary.pending)}</td>
                  <td className="px-5 py-4 text-emerald-700 font-black">{numberToCurrency(summary.paid)}</td>
                  <td className="px-5 py-4 text-rose-700 font-black">{numberToCurrency(summary.cancelled)}</td>
                  <td className="px-5 py-4 text-slate-700">{summary.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 rounded-3xl bg-white p-5 shadow-sm md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Filtrar por status
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">
            {"Todas,Pendente,Paga,Cancelada".split(",").map((status) => <option key={status}>{status}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Filtrar por base
          <select value={targetFilter} onChange={(event) => setTargetFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">
            {"Todas,Serviço,Produto/peça,Lavagem".split(",").map((target) => <option key={target}>{target}</option>)}
          </select>
        </label>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1280px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {["Funcionário", "Base", "Item", "OS", "Valor base", "Regra", "Calculado", "Referência", "Status", "Ações"].map((column) => (
                  <th key={column} className="px-5 py-4 font-black">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-5 py-8 text-center text-sm font-semibold text-slate-500">
                    Nenhuma comissão encontrada. Cadastre uma comissão para começar o controle de pagamento variável.
                  </td>
                </tr>
              ) : filteredRows.map((commission) => (
                <tr key={commission.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-black text-slate-950">{commission.employeeName || "Funcionário a definir"}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.targetType}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.targetName}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.sourceWorkOrderCode || "Manual"}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.baseAmount || "-"}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.valueType} • {commission.value}</td>
                  <td className="px-5 py-4 font-black text-slate-950">{commission.calculatedAmount || "-"}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.referenceDate || "-"}</td>
                  <td className="px-5 py-4"><StatusBadge status={commission.status || "Pendente"} /></td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/comissoes/${commission.id}`} className="rounded-full bg-blue-100 px-3 py-2 text-xs font-black text-blue-700 hover:bg-blue-200">Detalhe</Link>
                      <Link href={`/comissoes/${commission.id}/editar`} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 hover:bg-slate-200">Editar</Link>
                      <button type="button" onClick={() => handleStatusChange(commission.id, "Paga")} className="rounded-full bg-emerald-100 px-3 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-200">Pagar</button>
                      <button type="button" onClick={() => handleStatusChange(commission.id, "Cancelada")} className="rounded-full bg-rose-100 px-3 py-2 text-xs font-black text-rose-700 hover:bg-rose-200">Cancelar</button>
                      <button type="button" onClick={() => handleDelete(commission.id)} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 hover:bg-slate-200">Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
