"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock3, ExternalLink, Play, RefreshCw, Timer, Wrench } from "lucide-react";
import { listWorkOrders, StoredWorkOrder, updateWorkOrderStatus } from "@/lib/browser-store";

type MobileCard = {
  id: string;
  code: string;
  customer: string;
  vehicle: string;
  plate: string;
  service: string;
  status: string;
  startedAt?: string;
  finishedAt?: string;
};

function splitVehicleInfo(vehicle: string) {
  const parts = vehicle.split(" - ").map((item) => item.trim()).filter(Boolean);
  const platePattern = /^[A-Z]{3}[- ]?[0-9][A-Z0-9][0-9]{2}$/i;

  if (parts.length > 1 && platePattern.test(parts[0])) {
    return { plate: parts[0].toUpperCase(), vehicle: parts.slice(1).join(" - ") };
  }

  return { plate: "Não informada", vehicle: vehicle || "Veículo não informado" };
}

function formatDateTime(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatElapsedTime(startedAt?: string, finishedAt?: string) {
  if (!startedAt) return "Ainda não iniciado";

  const start = new Date(startedAt).getTime();
  const end = finishedAt ? new Date(finishedAt).getTime() : Date.now();

  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return "Tempo indisponível";

  const totalMinutes = Math.max(1, Math.round((end - start) / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours <= 0) return `${minutes} min`;
  if (minutes <= 0) return `${hours}h`;
  return `${hours}h ${minutes}min`;
}

function statusLabel(status: string) {
  if (status === "Aberta") return "Aguardando início";
  if (status === "Em andamento") return "Em andamento";
  if (status === "Aguardando peça") return "Aguardando peça";
  if (status === "Pronta para retirada") return "Pronta para retirada";
  return status || "Sem status";
}

function statusClass(status: string) {
  if (status === "Em andamento") return "bg-emerald-400 text-slate-950 ring-emerald-200/40";
  if (status === "Pronta para retirada") return "bg-blue-400 text-slate-950 ring-blue-200/40";
  if (status === "Aguardando peça") return "bg-amber-300 text-slate-950 ring-amber-200/40";
  return "bg-white text-slate-950 ring-white/40";
}

function orderPriority(status: string) {
  if (status === "Em andamento") return 1;
  if (status === "Aberta") return 2;
  if (status === "Aguardando peça") return 3;
  if (status === "Pronta para retirada") return 4;
  return 5;
}

function toMobileCard(order: StoredWorkOrder): MobileCard {
  const vehicleInfo = splitVehicleInfo(order.vehicle);

  return {
    id: order.id,
    code: order.code,
    customer: order.customer || "Cliente não informado",
    vehicle: vehicleInfo.vehicle,
    plate: vehicleInfo.plate,
    service: order.service || "Serviço não informado",
    status: order.status,
    startedAt: order.startedAt,
    finishedAt: order.finishedAt,
  };
}

export function MobileYardClient() {
  const [cards, setCards] = useState<MobileCard[]>([]);

  function loadCards() {
    const stored = listWorkOrders()
      .map(toMobileCard)
      .sort((left, right) => orderPriority(left.status) - orderPriority(right.status));

    setCards(stored);
  }

  useEffect(() => {
    loadCards();
  }, []);

  const stats = useMemo(() => ({
    total: cards.length,
    running: cards.filter((card) => card.status === "Em andamento").length,
    ready: cards.filter((card) => card.status === "Pronta para retirada").length,
  }), [cards]);

  function changeStatus(card: MobileCard, status: string) {
    updateWorkOrderStatus(card.id, status);
    loadCards();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-5 text-white sm:px-6">
      <header className="mx-auto max-w-2xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-300">AJB AutoFlow by AJBSYSTEMS</p>
              <h1 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">Pátio Mobile</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                Tela operacional para mecânicos, lavadores e equipe de pátio acompanharem as OS do dia com poucos toques.
              </p>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-blue-500 shadow-lg shadow-blue-950/40">
              <Wrench className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-3xl bg-slate-950/70 p-4">
              <p className="text-[0.65rem] font-black uppercase tracking-wide text-slate-400">OS</p>
              <p className="mt-1 text-2xl font-black">{stats.total}</p>
            </div>
            <div className="rounded-3xl bg-emerald-400/15 p-4">
              <p className="text-[0.65rem] font-black uppercase tracking-wide text-emerald-200">Rodando</p>
              <p className="mt-1 text-2xl font-black text-emerald-200">{stats.running}</p>
            </div>
            <div className="rounded-3xl bg-blue-400/15 p-4">
              <p className="text-[0.65rem] font-black uppercase tracking-wide text-blue-200">Prontas</p>
              <p className="mt-1 text-2xl font-black text-blue-200">{stats.ready}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto mt-6 grid max-w-2xl gap-4 pb-8">
        {cards.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/10 p-6 text-center shadow-xl shadow-slate-950/30">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-500/20 text-blue-200">
              <Wrench className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-2xl font-black">Nenhuma OS no pátio ainda</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Assim que uma ordem de serviço for cadastrada, ela aparecerá aqui em cards grandes para a equipe iniciar, finalizar e abrir o detalhe rapidamente pelo celular.
            </p>
            <Link href="/ordens-servico/nova" className="mt-5 inline-flex min-h-14 items-center justify-center rounded-3xl bg-blue-500 px-6 text-base font-black text-white shadow-lg shadow-blue-950/40">
              Criar primeira OS
            </Link>
          </div>
        ) : (
          cards.map((card) => {
            const started = formatDateTime(card.startedAt);
            const finished = formatDateTime(card.finishedAt);
            const elapsed = formatElapsedTime(card.startedAt, card.finishedAt);
            const canStart = card.status !== "Em andamento" && card.status !== "Pronta para retirada";
            const canFinish = card.status !== "Pronta para retirada";

            return (
              <article key={card.id} className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-xl shadow-slate-950/30 backdrop-blur">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-black text-blue-300">{card.code}</p>
                    <h2 className="mt-1 text-2xl font-black leading-tight text-white">{card.vehicle}</h2>
                    <p className="mt-2 text-sm text-slate-300">{card.customer}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-2 text-[0.68rem] font-black uppercase tracking-wide ring-2 ${statusClass(card.status)}`}>
                    {statusLabel(card.status)}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950/70 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Placa</p>
                    <p className="mt-1 text-xl font-black text-white">{card.plate}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/70 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Serviço</p>
                    <p className="mt-1 font-black text-white">{card.service}</p>
                  </div>
                </div>

                <div className="mt-3 rounded-3xl bg-slate-900/90 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-300"><Timer className="h-4 w-4" /> Tempo operacional</span>
                    <strong className="text-sm font-black text-white">{elapsed}</strong>
                  </div>
                  <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-2">
                    <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" /> Início: {started || "pendente"}</span>
                    <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Fim: {finished || "pendente"}</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => changeStatus(card, "Em andamento")}
                    className="flex min-h-24 flex-col items-center justify-center rounded-3xl bg-emerald-500 px-3 text-slate-950 shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-45"
                    disabled={!canStart}
                  >
                    <Play className="h-8 w-8 fill-current" />
                    <span className="mt-2 text-lg font-black">Iniciar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => changeStatus(card, "Pronta para retirada")}
                    className="flex min-h-24 flex-col items-center justify-center rounded-3xl bg-blue-500 px-3 text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-45"
                    disabled={!canFinish}
                  >
                    <CheckCircle2 className="h-8 w-8" />
                    <span className="mt-2 text-lg font-black">Finalizar</span>
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={loadCards}
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/10 px-4 text-sm font-black text-slate-200 transition hover:bg-white/15"
                  >
                    <RefreshCw className="h-4 w-4" /> Atualizar
                  </button>
                  <Link href={`/ordens-servico/${card.id}`} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-3xl bg-white px-4 text-sm font-black text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-blue-50">
                    <ExternalLink className="h-4 w-4" /> Abrir OS
                  </Link>
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}
