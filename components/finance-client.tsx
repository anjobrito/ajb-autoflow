"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BadgeDollarSign, ClipboardList, Percent, Receipt, TrendingUp, Wallet } from "lucide-react";
import { getFinancialSummary, listWorkOrders, numberToCurrency, StoredWorkOrder } from "@/lib/browser-store";

type Summary = {
  revenue: number;
  profit: number;
  ticket: number;
  margin: number;
  workOrders: number;
};

function marginLabel(value: number) {
  return `${value.toFixed(1).replace(".", ",")}%`;
}

export function FinanceClient() {
  const [summary, setSummary] = useState<Summary>({ revenue: 0, profit: 0, ticket: 0, margin: 0, workOrders: 0 });
  const [orders, setOrders] = useState<StoredWorkOrder[]>([]);

  useEffect(() => {
    setSummary(getFinancialSummary());
    setOrders(listWorkOrders());
  }, []);

  const cards = [
    { label: "Faturamento", value: numberToCurrency(summary.revenue), icon: BadgeDollarSign },
    { label: "Lucro estimado", value: numberToCurrency(summary.profit), icon: TrendingUp },
    { label: "Ticket médio", value: numberToCurrency(summary.ticket), icon: ClipboardList },
    { label: "Margem geral", value: marginLabel(summary.margin), icon: Percent },
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
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/contas-pagar" className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <Wallet className="h-8 w-8 text-blue-700" />
          <h2 className="mt-4 text-xl font-black">Contas a pagar</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Controle despesas, fornecedores, boletos, comissões e compromissos financeiros em localStorage.</p>
        </Link>
        <Link href="/contas-receber" className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <Receipt className="h-8 w-8 text-blue-700" />
          <h2 className="mt-4 text-xl font-black">Contas a receber</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Acompanhe recebíveis de OS, lavagens, vendas de peças, contratos e entradas previstas.</p>
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6">
            <h2 className="text-xl font-black">Ordens consideradas</h2>
            <p className="mt-2 text-sm text-slate-600">Resumo financeiro operacional com base nas OS cadastradas no navegador.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  {['OS', 'Cliente', 'Serviço', 'Produto', 'Total', 'Lucro', 'Margem'].map((column) => (
                    <th key={column} className="px-5 py-4 font-black">{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.length > 0 ? orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-black text-slate-950">{order.code}</td>
                    <td className="px-5 py-4 text-slate-700">{order.customer}</td>
                    <td className="px-5 py-4 text-slate-700">{order.service}</td>
                    <td className="px-5 py-4 text-slate-700">{order.product}</td>
                    <td className="px-5 py-4 text-slate-700">{order.total}</td>
                    <td className="px-5 py-4 font-black text-emerald-700">{order.estimatedProfit || "R$ 0,00"}</td>
                    <td className="px-5 py-4"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{order.estimatedMargin || "0,0%"}</span></td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-slate-500">Nenhuma OS cadastrada ainda. Crie a primeira OS para alimentar faturamento, margem e financeiro operacional.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
          <p className="text-sm font-bold text-blue-300">Leitura gerencial</p>
          <h2 className="mt-2 text-2xl font-black">Controle lucro, não só atendimento.</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Essa tela mostra ao dono da oficina, lava-jato ou centro automotivo quanto entrou, quanto sobrou estimado e qual margem foi gerada pelas peças e serviços.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-slate-200">
            <div className="rounded-2xl bg-white/10 p-4">OS cadastradas: {summary.workOrders}</div>
            <div className="rounded-2xl bg-white/10 p-4">Ticket médio: {numberToCurrency(summary.ticket)}</div>
            <div className="rounded-2xl bg-emerald-500/20 p-4 font-black text-emerald-200">Lucro estimado: {numberToCurrency(summary.profit)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
