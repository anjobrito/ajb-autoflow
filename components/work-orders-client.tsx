"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { demoWorkOrders } from "@/lib/demo-data";
import { listWorkOrders, StoredWorkOrder } from "@/lib/browser-store";

export function WorkOrdersClient() {
  const [orders, setOrders] = useState<StoredWorkOrder[]>([]);

  useEffect(() => {
    setOrders(listWorkOrders());
  }, []);

  const rows = [
    ...orders.map((order) => ({
      id: order.id,
      code: order.code,
      customer: order.customer,
      vehicle: order.vehicle,
      service: order.service,
      responsibleEmployeeName: order.responsibleEmployeeName ?? "Não definido",
      status: order.status,
      total: order.total,
      origin: "Novo cadastro",
    })),
    ...demoWorkOrders.map((order) => ({ ...order, responsibleEmployeeName: "Não definido", origin: "Demo" })),
  ];

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {['OS', 'Cliente', 'Veículo', 'Serviço', 'Responsável', 'Status', 'Total', 'Detalhe'].map((column) => (
                <th key={column} className="px-5 py-4 font-black">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={`${row.id}-${row.origin}`} className="hover:bg-slate-50">
                <td className="px-5 py-4 font-black text-slate-950">{row.code}</td>
                <td className="px-5 py-4 text-slate-700">{row.customer}</td>
                <td className="px-5 py-4 text-slate-700">{row.vehicle}</td>
                <td className="px-5 py-4 text-slate-700">{row.service}</td>
                <td className="px-5 py-4 text-slate-700">{row.responsibleEmployeeName}</td>
                <td className="px-5 py-4"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{row.status}</span></td>
                <td className="px-5 py-4 text-slate-700">{row.total}</td>
                <td className="px-5 py-4"><Link href={`/ordens-servico/${row.id}`} className="font-black text-blue-700 hover:text-blue-900">Abrir</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
