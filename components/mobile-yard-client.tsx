"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Play, Wrench } from "lucide-react";
import { listWorkOrders, StoredWorkOrder, updateWorkOrderStatus } from "@/lib/browser-store";
import { demoWorkOrders } from "@/lib/demo-data";

type MobileCard = {
  id: string;
  code: string;
  customer: string;
  vehicle: string;
  service: string;
  status: string;
  isDemo?: boolean;
};

const fallbackCards: MobileCard[] = demoWorkOrders.map((order) => ({
  id: order.id,
  code: order.code,
  customer: order.customer,
  vehicle: `${order.plate} - ${order.vehicle}`,
  service: order.service,
  status: order.status,
  isDemo: true,
}));

function statusLabel(status: string) {
  if (status === "Aberta") return "Aguardando";
  if (status === "Em andamento") return "Em execução";
  if (status === "Aguardando peça") return "Aguardando peça";
  if (status === "Pronta para retirada") return "Pronto";
  return status;
}

function statusClass(status: string) {
  if (status === "Em andamento") return "bg-emerald-400 text-slate-950";
  if (status === "Pronta para retirada") return "bg-blue-400 text-slate-950";
  if (status === "Aguardando peça") return "bg-amber-300 text-slate-950";
  return "bg-white text-slate-950";
}

export function MobileYardClient() {
  const [cards, setCards] = useState<MobileCard[]>([]);

  function loadCards() {
    const stored = listWorkOrders().map((order: StoredWorkOrder) => ({
      id: order.id,
      code: order.code,
      customer: order.customer,
      vehicle: order.vehicle,
      service: order.service,
      status: order.status,
    }));
    setCards(stored.length > 0 ? stored : fallbackCards);
  }

  useEffect(() => {
    loadCards();
  }, []);

  function changeStatus(card: MobileCard, status: string) {
    if (card.isDemo) {
      setCards((current) => current.map((item) => item.id === card.id ? { ...item, status } : item));
      return;
    }

    updateWorkOrderStatus(card.id, status);
    loadCards();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-5 text-white">
      <header className="mx-auto max-w-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-300">AJB AutoFlow</p>
            <h1 className="mt-1 text-3xl font-black">Pátio Mobile</h1>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500">
            <Wrench className="h-6 w-6" />
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-300">Interface escura, botões grandes e fluxo rápido para mecânicos e lavadores.</p>
      </header>

      <section className="mx-auto mt-6 grid max-w-md gap-4">
        {cards.map((card) => (
          <article key={card.id} className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-blue-300">{card.code}</p>
                <h2 className="mt-1 text-2xl font-black">{card.vehicle}</h2>
                <p className="mt-1 text-sm text-slate-300">{card.customer}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-black ${statusClass(card.status)}`}>{statusLabel(card.status)}</span>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-900 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Serviço</p>
              <p className="mt-1 font-black text-white">{card.service}</p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => changeStatus(card, "Em andamento")} className="flex min-h-24 flex-col items-center justify-center rounded-3xl bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-950/30 disabled:opacity-50" disabled={card.status === "Em andamento" || card.status === "Pronta para retirada"}>
                <Play className="h-8 w-8 fill-current" />
                <span className="mt-2 text-lg font-black">Iniciar</span>
              </button>
              <button type="button" onClick={() => changeStatus(card, "Pronta para retirada")} className="flex min-h-24 flex-col items-center justify-center rounded-3xl bg-blue-500 text-white shadow-lg shadow-blue-950/30 disabled:opacity-50" disabled={card.status === "Pronta para retirada"}>
                <CheckCircle2 className="h-8 w-8" />
                <span className="mt-2 text-lg font-black">Finalizar</span>
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> Regra dos 3 cliques</span>
              <Link href={`/ordens-servico/${card.id}`} className="font-black text-blue-300">Detalhe</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
