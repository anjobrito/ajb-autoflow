"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, Timer, Wrench } from "lucide-react";
import { demoWorkOrders } from "@/lib/demo-data";
import { findWorkOrderById, StoredWorkOrder } from "@/lib/browser-store";

type DetailOrder = {
  id: string;
  code: string;
  customer: string;
  vehicle: string;
  plate?: string;
  service: string;
  product?: string;
  status: string;
  total: string;
  notes?: string;
  startedAt?: string;
  finishedAt?: string;
  estimatedProfit?: string;
  estimatedMargin?: string;
};

function formatDateTime(value?: string) {
  if (!value) return "Ainda não registrado";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatDuration(start?: string, end?: string) {
  if (!start) return "Aguardando início";
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  const diffMs = Math.max(0, endDate.getTime() - startDate.getTime());
  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours <= 0) return `${minutes} min`;
  return `${hours}h ${minutes}min`;
}

export function WorkOrderDetailClient({ id }: { id: string }) {
  const [storedOrder, setStoredOrder] = useState<StoredWorkOrder | null>(null);

  useEffect(() => {
    setStoredOrder(findWorkOrderById(id) ?? null);
  }, [id]);

  const order: DetailOrder = useMemo(() => {
    if (storedOrder) {
      return {
        id: storedOrder.id,
        code: storedOrder.code,
        customer: storedOrder.customer,
        vehicle: storedOrder.vehicle,
        plate: storedOrder.vehicle.split(" - ")[0] ?? "",
        service: storedOrder.service,
        product: storedOrder.product,
        status: storedOrder.status,
        total: storedOrder.total,
        notes: storedOrder.notes,
        startedAt: storedOrder.startedAt,
        finishedAt: storedOrder.finishedAt,
        estimatedProfit: storedOrder.estimatedProfit,
        estimatedMargin: storedOrder.estimatedMargin,
      };
    }

    const demo = demoWorkOrders.find((item) => item.id === id) ?? demoWorkOrders[2];
    return demo;
  }, [id, storedOrder]);

  const details = [
    ["Cliente", order.customer],
    ["Veículo", order.vehicle],
    ["Placa", order.plate ?? "Não informada"],
    ["Serviço", order.service],
    ["Produto", order.product ?? "Não informado"],
    ["Status", order.status],
    ["Total", order.total],
    ["Lucro estimado", order.estimatedProfit ?? "Não calculado"],
    ["Margem estimada", order.estimatedMargin ?? "Não calculada"],
    ["Observações", order.notes ?? "Sem observações"],
  ];

  const timeline = [
    ["OS aberta pelo atendente", "Registro inicial do atendimento."],
    ["Serviço iniciado", order.startedAt ? `Iniciado em ${formatDateTime(order.startedAt)}` : "Aguardando clique em Iniciar no pátio mobile."],
    ["Execução em andamento", `Duração atual/total: ${formatDuration(order.startedAt, order.finishedAt)}`],
    ["Veículo pronto para retirada", order.finishedAt ? `Finalizado em ${formatDateTime(order.finishedAt)}` : "Aguardando clique em Finalizar."],
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <Clock className="h-7 w-7 text-blue-700" />
            <p className="mt-4 text-sm text-slate-500">Início</p>
            <p className="mt-2 font-black text-slate-950">{formatDateTime(order.startedAt)}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <Wrench className="h-7 w-7 text-blue-700" />
            <p className="mt-4 text-sm text-slate-500">Conclusão</p>
            <p className="mt-2 font-black text-slate-950">{formatDateTime(order.finishedAt)}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <Timer className="h-7 w-7 text-blue-700" />
            <p className="mt-4 text-sm text-slate-500">Duração</p>
            <p className="mt-2 font-black text-slate-950">{formatDuration(order.startedAt, order.finishedAt)}</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">{order.code} - {order.status}</h2>
          <p className="mt-2 text-sm text-slate-600">Acompanhe o serviço, tempos, valores e aviso ao cliente.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {details.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                <p className="mt-2 font-black text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Linha do tempo</h2>
          <div className="mt-6 grid gap-4">
            {timeline.map(([item, description], index) => (
              <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">{index + 1}</div>
                <div>
                  <p className="font-black">{item}</p>
                  <p className="text-sm text-slate-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm font-bold text-blue-300">Mensagem ao cliente</p>
        <h2 className="mt-2 text-2xl font-black">Veículo pronto para retirada</h2>
        <p className="mt-4 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-slate-200">
          Olá, {order.customer}. O serviço do seu veículo {order.vehicle} foi finalizado pela AutoFlow Garage. Seu veículo já está disponível para retirada.
        </p>
        <form action="/api/notifications/vehicle-ready" method="post" className="mt-6">
          <input type="hidden" name="customer" value={order.customer} />
          <input type="hidden" name="vehicle" value={order.vehicle} />
          <input type="hidden" name="plate" value={order.plate ?? ""} />
          <button className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950">Enviar aviso demo</button>
        </form>
        <p className="mt-4 text-xs leading-5 text-slate-400">No MVP real, esse botão usará Resend para e-mail e depois poderá evoluir para SMS ou WhatsApp oficial.</p>
      </div>
    </div>
  );
}
