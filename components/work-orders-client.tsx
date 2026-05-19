"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { UiModal } from "@/components/ui-modal";
import { NewWorkOrderForm } from "@/components/new-work-order-form";
import { demoWorkOrders } from "@/lib/demo-data";
import { getCompany, listWorkOrders, StoredWorkOrder } from "@/lib/browser-store";
import { getBusinessProfileByLabel } from "@/lib/business-types";

export function WorkOrdersClient() {
  const [businessType, setBusinessType] = useState("Completo / Multioperação");
  const [orders, setOrders] = useState<StoredWorkOrder[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  function refresh() {
    setBusinessType(getCompany().businessType || "Completo / Multioperação");
    setOrders(listWorkOrders());
  }

  useEffect(() => {
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("ajb-company-updated", refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("ajb-company-updated", refresh);
    };
  }, []);

  const profile = useMemo(() => getBusinessProfileByLabel(businessType), [businessType]);

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

  const operationColumn = profile.operationLabel;
  const serviceColumn = profile.id === "REVENDEDORA" ? "Etapa / preparação" : profile.id === "ESTACIONAMENTO" ? "Contrato / permanência" : profile.id === "AUTOPECAS" ? "Pedido / produto" : "Serviço";
  const responsibleColumn = profile.id === "REVENDEDORA" ? "Vendedor" : "Responsável";

  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-blue-700">Contexto operacional ativo</p>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">Perfil</p>
                <p className="mt-2 text-lg font-black text-slate-950">{profile.label}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">Fluxo</p>
                <p className="mt-2 text-lg font-black text-slate-950">{profile.operationPluralLabel}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">Kanban</p>
                <p className="mt-2 text-lg font-black text-slate-950">{profile.kanbanLabel}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.kanbanStatuses.map((status) => (
                <span key={status} className="rounded-full bg-white px-3 py-1 text-xs font-black text-blue-700 shadow-sm">{status}</span>
              ))}
            </div>
          </div>
          <button type="button" onClick={() => setIsFormOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Novo {profile.operationLabel}
          </button>
        </div>
      </section>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-xl font-black text-slate-950">{profile.operationPluralLabel}</h2>
          <p className="mt-2 text-sm text-slate-600">Lista operacional adaptada ao perfil {profile.label}. Cadastros novos abrem em lightbox para manter a tela limpa.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {[operationColumn, "Cliente", "Veículo", serviceColumn, responsibleColumn, "Status", "Total", "Detalhe"].map((column) => (
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

      <UiModal open={isFormOpen} title={`Novo ${profile.operationLabel}`} description={`Cadastre ${profile.operationPluralLabel.toLowerCase()} em lightbox, respeitando o fluxo operacional do perfil ${profile.label}.`} onClose={() => setIsFormOpen(false)}>
        <NewWorkOrderForm onCancel={() => setIsFormOpen(false)} onSaved={() => { refresh(); setIsFormOpen(false); }} submitLabel={`Salvar ${profile.operationLabel}`} />
      </UiModal>
    </div>
  );
}
