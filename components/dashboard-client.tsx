"use client";

import Link from "next/link";
import { Bell, Car, ClipboardList, Package, Users, Wrench } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getCompany, getDashboardStats, listWorkOrders, StoredWorkOrder } from "@/lib/browser-store";
import { filterWorkOrdersByBusinessProfile } from "@/lib/business-profile-work-orders";
import { BusinessProfile, getBusinessProfileByLabel } from "@/lib/business-types";

type DashboardFallbackRow = [string, string, string, string];

const fallbackOrdersByProfile: Record<BusinessProfile["id"], DashboardFallbackRow[]> = {
  COMPLETO: [["OP-1024", "João Pereira", "Honda Civic", "Em atendimento"], ["OP-1025", "Maria Souza", "Fiat Argo", "Aguardando"], ["OP-1026", "Carlos Lima", "VW Gol", "Pronto"]],
  OFICINA: [["OS-1024", "João Pereira", "Honda Civic", "Em andamento"], ["OS-1025", "Maria Souza", "Fiat Argo", "Aguardando peça"], ["OS-1026", "Carlos Lima", "VW Gol", "Pronta para retirada"]],
  LAVA_JATO: [["LAV-1024", "João Pereira", "Honda Civic", "Em lavagem"], ["LAV-1025", "Maria Souza", "Fiat Argo", "Acabamento"], ["LAV-1026", "Carlos Lima", "VW Gol", "Pronto"]],
  ESTETICA: [["EST-1024", "João Pereira", "Honda Civic", "Em execução"], ["EST-1025", "Maria Souza", "Fiat Argo", "Cura/secagem"], ["EST-1026", "Carlos Lima", "VW Gol", "Revisão final"]],
  CENTRO_AUTOMOTIVO: [["OA-1024", "João Pereira", "Honda Civic", "Diagnóstico"], ["OA-1025", "Maria Souza", "Fiat Argo", "Em execução"], ["OA-1026", "Carlos Lima", "VW Gol", "Controle de qualidade"]],
  ESTACIONAMENTO: [["MOV-1024", "João Pereira", "Honda Civic", "Estacionado"], ["MOV-1025", "Maria Souza", "Fiat Argo", "Mensalista"], ["MOV-1026", "Carlos Lima", "VW Gol", "Pagamento pendente"]],
  REVENDEDORA: [["PV-1024", "João Pereira", "Honda Civic", "Preparação"], ["PV-1025", "Maria Souza", "Fiat Argo", "Em negociação"], ["PV-1026", "Carlos Lima", "VW Gol", "Documentação"]],
  AUTOPECAS: [["PED-1024", "João Pereira", "Pedido balcão", "Separação"], ["PED-1025", "Maria Souza", "Entrega local", "Aguardando pagamento"], ["PED-1026", "Carlos Lima", "Pedido online", "Faturado"]],
};

function getFallbackOrders(profile: BusinessProfile) {
  return fallbackOrdersByProfile[profile.id] ?? fallbackOrdersByProfile.COMPLETO;
}

function getInventoryCardLabel(profile: BusinessProfile) {
  if (profile.id === "REVENDEDORA") return "Veículos no estoque";
  if (profile.id === "AUTOPECAS") return "Itens no estoque";
  if (profile.id === "LAVA_JATO" || profile.id === "ESTETICA") return "Produtos operacionais";
  if (profile.id === "ESTACIONAMENTO") return "Itens operacionais";
  return "Itens no estoque";
}

function getReadySummaryLabel(profile: BusinessProfile) {
  if (profile.id === "LAVA_JATO") return "atendimentos prontos no fluxo";
  if (profile.id === "ESTETICA") return "atendimentos estéticos prontos no fluxo";
  if (profile.id === "REVENDEDORA") return "processos de venda prontos no fluxo";
  if (profile.id === "ESTACIONAMENTO") return "movimentações finalizadas no fluxo";
  if (profile.id === "AUTOPECAS") return "pedidos prontos no fluxo";
  return "itens prontos no fluxo";
}

function getStockSummaryLabel(profile: BusinessProfile) {
  if (profile.id === "LAVA_JATO" || profile.id === "ESTETICA") return "produtos operacionais em estoque baixo";
  if (profile.id === "REVENDEDORA") return "custos/itens operacionais em atenção";
  if (profile.id === "ESTACIONAMENTO") return "itens operacionais em atenção";
  if (profile.id === "AUTOPECAS") return "itens em estoque baixo";
  return "itens em estoque baixo";
}

export function DashboardClient() {
  const [businessType, setBusinessType] = useState("Completo / Multioperação");
  const [stats, setStats] = useState({ customers: 0, vehicles: 0, products: 0, services: 0, workOrders: 0, openWorkOrders: 0, readyWorkOrders: 0, lowStock: 0 });
  const [orders, setOrders] = useState<StoredWorkOrder[]>([]);

  useEffect(() => {
    function refresh() {
      const company = getCompany();
      const profile = getBusinessProfileByLabel(company.businessType || "Completo / Multioperação");
      const profileOrders = filterWorkOrdersByBusinessProfile(listWorkOrders(), profile);
      const dashboardStats = getDashboardStats();
      setBusinessType(profile.label);
      setStats({ ...dashboardStats, workOrders: profileOrders.length, openWorkOrders: profileOrders.filter((order) => !profile.kanbanStatuses.slice(-1).includes(order.status)).length, readyWorkOrders: profileOrders.filter((order) => profile.kanbanStatuses.slice(-2, -1).includes(order.status)).length });
      setOrders(profileOrders.slice(0, 4));
    }

    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("ajb-company-updated", refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("ajb-company-updated", refresh);
    };
  }, []);

  const profile = useMemo(() => getBusinessProfileByLabel(businessType), [businessType]);

  const cards = [
    { label: profile.dashboardCards[0] ?? profile.operationPluralLabel, value: String(stats.workOrders), icon: ClipboardList },
    { label: "Clientes", value: String(stats.customers), icon: Users },
    { label: "Veículos", value: String(stats.vehicles), icon: Car },
    { label: getInventoryCardLabel(profile), value: String(stats.products), icon: Package },
  ];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return <div key={card.label} className="rounded-3xl bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm text-slate-500">{card.label}</p><Icon className="h-5 w-5 text-blue-700" /></div><p className="mt-4 text-4xl font-black">{card.value}</p></div>;
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div><h2 className="text-xl font-black">{profile.operationPluralLabel} recentes</h2><p className="mt-1 text-sm text-slate-600">Fluxo principal: {profile.kanbanLabel}</p></div>
            <Link href="/ordens-servico/nova" className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white">Novo {profile.operationLabel}</Link>
          </div>
          <div className="grid gap-3">
            {orders.length > 0 ? orders.map((order) => (
              <Link key={order.id} href={`/ordens-servico/${order.id}`} className="grid gap-2 rounded-2xl border border-slate-200 p-4 hover:bg-slate-50 sm:grid-cols-[120px_1fr_1fr_180px] sm:items-center"><p className="font-black">{order.code}</p><p>{order.customer}</p><p className="text-slate-600">{order.vehicle}</p><span className="rounded-full bg-blue-50 px-3 py-1 text-center text-xs font-bold text-blue-700">{order.status}</span></Link>
            )) : getFallbackOrders(profile).map(([code, customer, vehicle, status]) => (
              <div key={code} className="grid gap-2 rounded-2xl border border-slate-200 p-4 sm:grid-cols-[120px_1fr_1fr_180px] sm:items-center"><p className="font-black">{code}</p><p>{customer}</p><p className="text-slate-600">{vehicle}</p><span className="rounded-full bg-blue-50 px-3 py-1 text-center text-xs font-bold text-blue-700">{status}</span></div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm"><Bell className="h-8 w-8 text-blue-300" /><h2 className="mt-4 text-xl font-black">Acompanhar cliente</h2><p className="mt-2 text-sm leading-6 text-slate-300">Use {profile.operationPluralLabel.toLowerCase()} para manter o cliente informado conforme o fluxo do perfil {profile.label}.</p><Link href="/ordens-servico" className="mt-6 inline-flex w-full justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950">Ver {profile.operationPluralLabel.toLowerCase()}</Link></div>
          <div className="rounded-3xl bg-white p-6 shadow-sm"><Wrench className="h-8 w-8 text-blue-700" /><h2 className="mt-4 text-xl font-black">Indicadores do perfil</h2><div className="mt-3 flex flex-wrap gap-2">{profile.dashboardCards.slice(0, 6).map((card) => <span key={card} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{card}</span>)}</div><p className="mt-4 text-sm text-slate-600">{stats.readyWorkOrders} {getReadySummaryLabel(profile)} e {stats.lowStock} {getStockSummaryLabel(profile)}.</p></div>
        </div>
      </div>
    </>
  );
}
