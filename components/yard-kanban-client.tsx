"use client";

import Link from "next/link";
import { DragEvent, useEffect, useMemo, useState } from "react";
import { Car, Clock, ClipboardList, Move } from "lucide-react";
import { getCompany, listWorkOrders, StoredWorkOrder, updateWorkOrderStatus } from "@/lib/browser-store";
import { BusinessProfile, getBusinessProfileByLabel } from "@/lib/business-types";

type KanbanCard = {
  id: string;
  code: string;
  customer: string;
  vehicle: string;
  service: string;
  status: string;
  total: string;
  source: "storage" | "demo";
};

type KanbanColumn = {
  title: string;
  status: string;
};

const fallbackStatuses = ["Entrada", "Em atendimento", "Aguardando", "Pronto", "Entregue", "Finalizado"];

function buildDemoCards(profile: BusinessProfile): KanbanCard[] {
  const statuses = profile.kanbanStatuses.length > 0 ? profile.kanbanStatuses : fallbackStatuses;
  const statusAt = (index: number) => statuses[Math.min(index, statuses.length - 1)] ?? fallbackStatuses[0];

  if (profile.id === "LAVA_JATO") {
    return [
      { id: "demo-lava-001", code: "LAV-1001", customer: "João Pereira", vehicle: "ABC1D23 - Honda Civic", service: "Lavagem completa", status: statusAt(1), total: "R$ 70,00", source: "demo" },
      { id: "demo-lava-002", code: "LAV-1002", customer: "Maria Souza", vehicle: "BRA2E44 - Fiat Argo", service: "Lavagem simples", status: statusAt(0), total: "R$ 40,00", source: "demo" },
      { id: "demo-lava-003", code: "LAV-1003", customer: "Carlos Lima", vehicle: "CAR9F10 - VW Gol", service: "Acabamento com cera", status: statusAt(2), total: "R$ 95,00", source: "demo" },
      { id: "demo-lava-004", code: "LAV-1004", customer: "Ana Martins", vehicle: "AIB7S20 - Chevrolet Onix", service: "Higienização interna", status: statusAt(0), total: "R$ 180,00", source: "demo" },
    ];
  }

  if (profile.id === "ESTETICA") {
    return [
      { id: "demo-est-001", code: "EST-2001", customer: "João Pereira", vehicle: "ABC1D23 - Honda Civic", service: "Polimento técnico", status: statusAt(2), total: "R$ 650,00", source: "demo" },
      { id: "demo-est-002", code: "EST-2002", customer: "Maria Souza", vehicle: "BRA2E44 - Fiat Argo", service: "Vitrificação de pintura", status: statusAt(3), total: "R$ 1.200,00", source: "demo" },
      { id: "demo-est-003", code: "EST-2003", customer: "Carlos Lima", vehicle: "CAR9F10 - VW Gol", service: "Higienização premium", status: statusAt(1), total: "R$ 320,00", source: "demo" },
    ];
  }

  if (profile.id === "REVENDEDORA") {
    return [
      { id: "demo-rev-001", code: "VEN-3001", customer: "Interessado: Bruno Alves", vehicle: "ABC1D23 - Honda Civic", service: "Negociação com financiamento", status: statusAt(3), total: "R$ 82.900,00", source: "demo" },
      { id: "demo-rev-002", code: "VEN-3002", customer: "Estoque da loja", vehicle: "BRA2E44 - Fiat Argo", service: "Preparação para anúncio", status: statusAt(1), total: "R$ 58.500,00", source: "demo" },
      { id: "demo-rev-003", code: "VEN-3003", customer: "Interessada: Paula Gomes", vehicle: "CAR9F10 - VW Gol", service: "Documentação pós-venda", status: statusAt(5), total: "R$ 39.900,00", source: "demo" },
    ];
  }

  if (profile.id === "ESTACIONAMENTO") {
    return [
      { id: "demo-estac-001", code: "PAT-4001", customer: "Mensalista: João Pereira", vehicle: "ABC1D23 - Honda Civic", service: "Permanência mensal", status: statusAt(2), total: "R$ 280,00", source: "demo" },
      { id: "demo-estac-002", code: "PAT-4002", customer: "Avulso: Maria Souza", vehicle: "BRA2E44 - Fiat Argo", service: "Diária avulsa", status: statusAt(1), total: "R$ 35,00", source: "demo" },
      { id: "demo-estac-003", code: "PAT-4003", customer: "Carlos Lima", vehicle: "CAR9F10 - VW Gol", service: "Pagamento pendente", status: statusAt(3), total: "R$ 120,00", source: "demo" },
    ];
  }

  if (profile.id === "AUTOPECAS") {
    return [
      { id: "demo-pec-001", code: "PED-5001", customer: "Cliente balcão", vehicle: "Sem veículo vinculado", service: "Separação de filtros", status: statusAt(1), total: "R$ 156,00", source: "demo" },
      { id: "demo-pec-002", code: "PED-5002", customer: "Oficina parceira", vehicle: "Frota comercial", service: "Pedido de lubrificantes", status: statusAt(2), total: "R$ 890,00", source: "demo" },
      { id: "demo-pec-003", code: "PED-5003", customer: "Carlos Lima", vehicle: "CAR9F10 - VW Gol", service: "Produto faturado", status: statusAt(3), total: "R$ 240,00", source: "demo" },
    ];
  }

  return [
    { id: "demo-ofi-001", code: "OS-1024", customer: "João Pereira", vehicle: "ABC1D23 - Honda Civic", service: "Revisão preventiva", status: statusAt(1), total: "R$ 380,00", source: "demo" },
    { id: "demo-ofi-002", code: "OS-1025", customer: "Maria Souza", vehicle: "BRA2E44 - Fiat Argo", service: "Diagnóstico de suspensão", status: statusAt(2), total: "R$ 640,00", source: "demo" },
    { id: "demo-ofi-003", code: "OS-1026", customer: "Carlos Lima", vehicle: "CAR9F10 - VW Gol", service: "Controle de qualidade", status: statusAt(3), total: "R$ 180,00", source: "demo" },
    { id: "demo-ofi-004", code: "OS-1027", customer: "Ana Martins", vehicle: "AIB7S20 - Chevrolet Onix", service: "Entrada para orçamento", status: statusAt(0), total: "R$ 0,00", source: "demo" },
  ];
}

function normalizeOrder(order: StoredWorkOrder): KanbanCard {
  return {
    id: order.id,
    code: order.code,
    customer: order.customer,
    vehicle: order.vehicle,
    service: order.service,
    status: order.status,
    total: order.total,
    source: "storage",
  };
}

function buildColumns(statuses: string[]): KanbanColumn[] {
  return statuses.map((status) => ({ title: status, status }));
}

export function YardKanbanClient() {
  const [businessType, setBusinessType] = useState("Completo / Multioperação");
  const [orders, setOrders] = useState<KanbanCard[]>([]);
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<string | null>(null);

  function refresh() {
    const company = getCompany();
    const profile = getBusinessProfileByLabel(company.businessType || "Completo / Multioperação");
    setBusinessType(profile.label);
    const stored = listWorkOrders().map(normalizeOrder);
    setOrders(stored.length > 0 ? stored : buildDemoCards(profile));
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
  const columns = useMemo(() => buildColumns(profile.kanbanStatuses.length > 0 ? profile.kanbanStatuses : fallbackStatuses), [profile.kanbanStatuses]);
  const firstStatus = columns[0]?.status ?? fallbackStatuses[0];
  const doneStatus = columns[columns.length - 1]?.status ?? "Entregue";
  const readyStatus = columns[Math.max(columns.length - 2, 0)]?.status ?? "Pronta para retirada";

  const normalizedOrders = useMemo(() => {
    const allowedStatuses = new Set(columns.map((column) => column.status));
    return orders.map((order) => allowedStatuses.has(order.status) ? order : { ...order, status: firstStatus });
  }, [orders, columns, firstStatus]);

  const totalInYard = normalizedOrders.filter((order) => order.status !== doneStatus).length;
  const ready = normalizedOrders.filter((order) => order.status === readyStatus).length;
  const inProgress = normalizedOrders.filter((order) => ![firstStatus, readyStatus, doneStatus].includes(order.status)).length;

  const grouped = useMemo(() => {
    return columns.map((column) => ({
      ...column,
      cards: normalizedOrders.filter((order) => order.status === column.status),
    }));
  }, [columns, normalizedOrders]);

  function handleDragStart(cardId: string) {
    setDraggingCardId(cardId);
  }

  function handleDragEnd() {
    setDraggingCardId(null);
    setDragOverStatus(null);
  }

  function handleDragOver(event: DragEvent<HTMLElement>, status: string) {
    event.preventDefault();
    setDragOverStatus(status);
  }

  function handleDrop(event: DragEvent<HTMLElement>, status: string) {
    event.preventDefault();
    if (!draggingCardId) return;

    const draggedCard = normalizedOrders.find((order) => order.id === draggingCardId);
    if (!draggedCard) return;

    setOrders((current) => current.map((order) => order.id === draggingCardId ? { ...order, status } : order));

    if (draggedCard.source === "storage") {
      updateWorkOrderStatus(draggingCardId, status);
    }

    setDraggingCardId(null);
    setDragOverStatus(null);
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Itens no fluxo</p>
          <p className="mt-3 text-4xl font-black">{totalInYard}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Próximos da entrega</p>
          <p className="mt-3 text-4xl font-black text-emerald-700">{ready}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Em andamento</p>
          <p className="mt-3 text-4xl font-black text-amber-700">{inProgress}</p>
        </div>
      </div>

      <section className="rounded-3xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-wide text-blue-700">Kanban drag and drop</p>
        <h2 className="mt-1 text-xl font-black text-slate-950">{profile.kanbanLabel}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Arraste os cards entre as colunas para atualizar o status do fluxo. Registros reais são salvos no localStorage; cards demo seguem o perfil selecionado e mudam apenas visualmente nesta sessão.
        </p>
      </section>

      <div className="overflow-x-auto pb-4">
        <div className="grid min-w-[1180px] gap-4" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(190px, 1fr))` }}>
          {grouped.map((column) => (
            <section
              key={column.status}
              onDragOver={(event) => handleDragOver(event, column.status)}
              onDrop={(event) => handleDrop(event, column.status)}
              className={`rounded-3xl p-4 transition ${dragOverStatus === column.status ? "bg-blue-100 ring-2 ring-blue-400" : "bg-slate-200/70"}`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-black text-slate-800">{column.title}</h2>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700">{column.cards.length}</span>
              </div>

              <div className="grid min-h-40 gap-3">
                {column.cards.length > 0 ? column.cards.map((card) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={() => handleDragStart(card.id)}
                    onDragEnd={handleDragEnd}
                    className={`rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${draggingCardId === card.id ? "opacity-50" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Link href={`/ordens-servico/${card.id}`} className="font-black text-slate-950 hover:text-blue-700">{card.code}</Link>
                      <div className="flex items-center gap-2">
                        <Move className="h-4 w-4 cursor-grab text-slate-400" />
                        <ClipboardList className="h-4 w-4 text-blue-700" />
                      </div>
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
                  </div>
                )) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-4 text-center text-sm text-slate-500">
                    Solte cards aqui ou avance itens para esta etapa.
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
