"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Camera, CheckSquare, Clock, Mail, Timer, Wrench } from "lucide-react";
import { demoWorkOrders } from "@/lib/demo-data";
import { findInspectionByWorkOrderId, findWorkOrderById, listCustomers, listVehicles, StoredCustomer, StoredInspection, StoredVehicle, StoredWorkOrder } from "@/lib/browser-store";
import { WorkOrderCommissionClient } from "@/components/work-order-commission-client";

type DetailOrder = {
  id: string;
  code: string;
  customer: string;
  vehicle: string;
  plate?: string;
  powertrain?: string;
  service: string;
  product?: string;
  status: string;
  total: string;
  responsibleEmployeeName?: string;
  notes?: string;
  startedAt?: string;
  finishedAt?: string;
  estimatedProfit?: string;
  estimatedMargin?: string;
};

type NotificationState = {
  status: "idle" | "sending" | "success" | "error";
  message: string;
};

function formatDateTime(value?: string) {
  if (!value) return "Ainda não registrado";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function formatDuration(start?: string, end?: string) {
  if (!start) return "Aguardando início";
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  const totalMinutes = Math.floor(Math.max(0, endDate.getTime() - startDate.getTime()) / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours <= 0 ? `${minutes} min` : `${hours}h ${minutes}min`;
}

function normalizePlate(value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

function normalizeName(value: string) {
  return value.trim().toLowerCase();
}

export function WorkOrderDetailClient({ id }: { id: string }) {
  const [storedOrder, setStoredOrder] = useState<StoredWorkOrder | null>(null);
  const [inspection, setInspection] = useState<StoredInspection | null>(null);
  const [vehicles, setVehicles] = useState<StoredVehicle[]>([]);
  const [customers, setCustomers] = useState<StoredCustomer[]>([]);
  const [notification, setNotification] = useState<NotificationState>({ status: "idle", message: "" });

  useEffect(() => {
    setStoredOrder(findWorkOrderById(id) ?? null);
    setInspection(findInspectionByWorkOrderId(id) ?? null);
    setVehicles(listVehicles());
    setCustomers(listCustomers());
  }, [id]);

  const order: DetailOrder = useMemo(() => {
    if (storedOrder) {
      const plate = storedOrder.vehicle.split(" - ")[0] ?? "";
      const vehicle = vehicles.find((item) => normalizePlate(item.plate) === normalizePlate(plate));

      return {
        id: storedOrder.id,
        code: storedOrder.code,
        customer: storedOrder.customer,
        vehicle: storedOrder.vehicle,
        plate,
        powertrain: vehicle?.powertrain || "Não informado",
        service: storedOrder.service,
        product: storedOrder.product,
        status: storedOrder.status,
        total: storedOrder.total,
        responsibleEmployeeName: storedOrder.responsibleEmployeeName,
        notes: storedOrder.notes,
        startedAt: storedOrder.startedAt,
        finishedAt: storedOrder.finishedAt,
        estimatedProfit: storedOrder.estimatedProfit,
        estimatedMargin: storedOrder.estimatedMargin,
      };
    }
    const demo = demoWorkOrders.find((item) => item.id === id) ?? demoWorkOrders[2];
    return { ...demo, powertrain: "Não informado", responsibleEmployeeName: "Não definido" };
  }, [id, storedOrder, vehicles]);

  const customerEmail = useMemo(() => {
    const found = customers.find((customer) => normalizeName(customer.name) === normalizeName(order.customer));
    return found?.email ?? "";
  }, [customers, order.customer]);

  async function sendVehicleReadyNotification() {
    setNotification({ status: "sending", message: "Enviando aviso ao cliente..." });

    try {
      const response = await fetch("/api/notifications/vehicle-ready", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: order.customer,
          vehicle: order.vehicle,
          plate: order.plate ?? "",
          email: customerEmail,
        }),
      });

      const data = await response.json().catch(() => ({ message: "Resposta inválida do servidor." }));

      if (!response.ok) {
        setNotification({ status: "error", message: data.message ?? "Não foi possível enviar o aviso." });
        return;
      }

      setNotification({ status: "success", message: data.message ?? "Aviso enviado/preparado com sucesso." });
    } catch {
      setNotification({ status: "error", message: "Falha de comunicação ao enviar o aviso." });
    }
  }

  const details = [
    ["Cliente", order.customer],
    ["E-mail", customerEmail || "Não informado no cadastro do cliente"],
    ["Veículo", order.vehicle],
    ["Placa", order.plate ?? "Não informada"],
    ["Propulsão", order.powertrain ?? "Não informado"],
    ["Serviço", order.service],
    ["Produto", order.product ?? "Não informado"],
    ["Responsável", order.responsibleEmployeeName ?? "Não definido"],
    ["Status", order.status],
    ["Total", order.total],
    ["Lucro estimado", order.estimatedProfit ?? "Não calculado"],
    ["Margem estimada", order.estimatedMargin ?? "Não calculada"],
    ["Observações", order.notes ?? "Sem observações"],
  ];

  const timeline = [
    ["OS aberta pelo atendente", "Registro inicial do atendimento."],
    ["Responsável definido", order.responsibleEmployeeName ? `${order.responsibleEmployeeName} vinculado à OS.` : "Nenhum responsável definido para esta OS."],
    ["Vistoria de entrada", inspection ? `Checklist salvo em ${formatDateTime(inspection.createdAt)}` : "Checklist ainda não registrado."],
    ["Serviço iniciado", order.startedAt ? `Iniciado em ${formatDateTime(order.startedAt)}` : "Aguardando clique em Iniciar no pátio mobile."],
    ["Execução em andamento", `Duração atual/total: ${formatDuration(order.startedAt, order.finishedAt)}`],
    ["Veículo pronto para retirada", order.finishedAt ? `Finalizado em ${formatDateTime(order.finishedAt)}` : "Aguardando clique em Finalizar."],
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm"><Clock className="h-7 w-7 text-blue-700" /><p className="mt-4 text-sm text-slate-500">Início</p><p className="mt-2 font-black text-slate-950">{formatDateTime(order.startedAt)}</p></div>
          <div className="rounded-3xl bg-white p-6 shadow-sm"><Wrench className="h-7 w-7 text-blue-700" /><p className="mt-4 text-sm text-slate-500">Conclusão</p><p className="mt-2 font-black text-slate-950">{formatDateTime(order.finishedAt)}</p></div>
          <div className="rounded-3xl bg-white p-6 shadow-sm"><Timer className="h-7 w-7 text-blue-700" /><p className="mt-4 text-sm text-slate-500">Duração</p><p className="mt-2 font-black text-slate-950">{formatDuration(order.startedAt, order.finishedAt)}</p></div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div><h2 className="text-xl font-black">{order.code} - {order.status}</h2><p className="mt-2 text-sm text-slate-600">Acompanhe o serviço, tempos, valores e vistoria.</p></div>
            <Link href={`/ordens-servico/${id}/vistoria`} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700"><Camera className="h-4 w-4" /> Fazer vistoria</Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {details.map(([label, value]) => (<div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 font-black text-slate-950">{value}</p></div>))}
          </div>
        </div>

        <WorkOrderCommissionClient workOrderId={id} />

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3"><h2 className="text-xl font-black">Resumo da vistoria</h2><CheckSquare className="h-6 w-6 text-blue-700" /></div>
          {inspection ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[["KM", inspection.mileage], ["Combustível", inspection.fuelLevel], ["Objetos pessoais", inspection.hasPersonalItems ? inspection.personalItems || "Sim" : "Não informado"], ["Avarias", inspection.damages.length > 0 ? inspection.damages.join(", ") : "Nenhuma marcada"], ["Observações", inspection.notes || "Sem observações"]].map(([label, value]) => (<div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 font-black text-slate-950">{value}</p></div>))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center"><p className="font-black text-slate-700">Nenhuma vistoria registrada ainda.</p><Link href={`/ordens-servico/${id}/vistoria`} className="mt-4 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white">Registrar checklist</Link></div>
          )}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Linha do tempo</h2>
          <div className="mt-6 grid gap-4">{timeline.map(([item, description], index) => (<div key={item} className="flex gap-4 rounded-2xl border border-slate-200 p-4"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">{index + 1}</div><div><p className="font-black">{item}</p><p className="text-sm text-slate-500">{description}</p></div></div>))}</div>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
        <Mail className="h-8 w-8 text-blue-300" />
        <p className="mt-4 text-sm font-bold text-blue-300">Mensagem ao cliente</p>
        <h2 className="mt-2 text-2xl font-black">Veículo pronto para retirada</h2>
        <p className="mt-4 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-slate-200">Olá, {order.customer}. O serviço do seu veículo {order.vehicle} foi finalizado pela AutoFlow Garage. Seu veículo já está disponível para retirada.</p>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Destino</p>
          <p className="mt-1 text-sm font-black text-white">{customerEmail || "E-mail não informado"}</p>
        </div>
        <button type="button" onClick={sendVehicleReadyNotification} disabled={notification.status === "sending"} className="mt-6 w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-70">
          {notification.status === "sending" ? "Enviando..." : "Enviar aviso por e-mail"}
        </button>
        {notification.message && (
          <p className={`mt-4 rounded-2xl p-4 text-xs leading-5 ${notification.status === "error" ? "bg-red-500/10 text-red-100" : "bg-emerald-500/10 text-emerald-100"}`}>{notification.message}</p>
        )}
        <p className="mt-4 text-xs leading-5 text-slate-400">Sem RESEND_API_KEY, o sistema mantém o modo demo. Com a chave configurada, o envio usa Resend no servidor.</p>
      </div>
    </div>
  );
}
