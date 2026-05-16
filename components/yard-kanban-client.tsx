"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Car, Clock, ClipboardList } from "lucide-react";
import { listWorkOrders, StoredWorkOrder } from "@/lib/browser-store";
import { demoWorkOrders } from "@/lib/demo-data";

type KanbanCard = {
  id: string;
  code: string;
  customer: string;
  vehicle: string;
  service: string;
  status: string;
  total: string;
};

const columns = [
  { title: "Aguardando triagem", statuses: ["Aberta"] },
  { title: "Em manutenção/lavagem", statuses: ["Em andamento"] },
  { title: "Aguardando peça", statuses: ["Aguardando peça"] },
  { title: "Controle de qualidade", statuses: ["Controle de qualidade"] },
  { title: "Pronto para entrega", statuses: ["Pronta para retirada"] },
  { title: "Entregue", statuses: ["Entregue"] },
];

const fallbackCards: KanbanCard[] = demoWorkOrders.map((order) => ({
  id: order.id,
  code: order.code,
  customer: order.customer,
  vehicle: `${order.plate} - ${order.vehicle}`,
  service: order.service,
  status: order.status,
  total: order.total,
}));

function normalizeOrder(order: StoredWorkOrder): KanbanCard {
  return {
    id: order.id,
    code: order.code,
    customer: order.customer,
    vehicle: order.vehicle,
    service: order.service,
    status: order.status,
    total: order.total,
  };
}

export function YardKanbanClient() {
  const [orders, setOrders] = useState<KanbanCard[]>([]);

  useEffect(() => {
    const stored = listWorkOrders().map(normalizeOrder);
    setOrders(stored.length > 0 ? stored : fallbackCards);
  }, []);

  const totalInYard = orders.filter((order) => order.status !== "Entregue").length;
  const ready = orders.filter((order) => order.status === "Pronta para retirada").length;
  const waitingParts = orders.filter((order) => order.status === "Aguardando peça").length;

  const grouped = useMemo(() => {
    return columns.map((column) => ({
      ...column,
      cards: orders.filter((order) => column.statuses.includes(order.status)),
    }));
  }, [orders]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Veículos no pátio</p>
          <p className="mt-3 text-4xl font-black">{totalInYard}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Prontos para entrega</p>
          <p className="mt-3 text-4xl font-black text-emerald-700">{ready}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Aguardando peça</p>
          <p className="mt-3 text-4xl font-black text-amber-700">{waitingParts}</p>
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="grid min-w-[1180px] grid-cols-6 gap-4">
          {grouped.map((column) => (
            <section key={column.title} className="rounded-3xl bg-slate-200/70 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-black text-slate-800">{column.title}</h2>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700">{column.cards.length}</span>
              </div>

              <div className="grid gap-3">
                {column.cards.length > 0 ? column.cards.map((card) => (
                  <Link key={card.id} href={`/ordens-servico/${card.id}`} className="rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-black text-slate-950">{card.code}</p>
                      <ClipboardList className="h-4 w-4 text-blue-700" />
                    </div>
                    <div className="mt-4 grid gap-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-slate-400" />
                        <span>{card.vehicle}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>{card.service}</span>
                      </div>
                    </div>
                    <div className="mt-4 rounded-2xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Cliente</p>
                      <p className="font-bold text-slate-950">{card.customer}</p>
                    </div>
                    <p className="mt-3 text-sm font-black text-blue-700">{card.total}</p>
                  </Link>
                )) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-4 text-center text-sm text-slate-500">
                    Nenhum veículo nesta etapa.
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
