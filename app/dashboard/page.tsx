import { Bell, Car, ClipboardList, Package, Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";

const cards = [
  { label: "OS abertas", value: "18", icon: ClipboardList },
  { label: "Clientes", value: "342", icon: Users },
  { label: "Veículos", value: "418", icon: Car },
  { label: "Itens em estoque", value: "1.248", icon: Package },
];

const orders = [
  ["OS-1024", "João Pereira", "Honda Civic", "Em andamento"],
  ["OS-1025", "Maria Souza", "Fiat Argo", "Aguardando peça"],
  ["OS-1026", "Carlos Lima", "VW Gol", "Pronta para retirada"],
];

export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Painel mobile-first"
        title="Controle da oficina"
        description="Visão rápida de atendimento, clientes, veículos, estoque e avisos."
        actionLabel="Nova OS"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{card.label}</p>
                <Icon className="h-5 w-5 text-blue-700" />
              </div>
              <p className="mt-4 text-4xl font-black">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-black">Ordens recentes</h2>
            <button className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white">Nova OS</button>
          </div>
          <div className="grid gap-3">
            {orders.map(([code, customer, vehicle, status]) => (
              <div key={code} className="grid gap-2 rounded-2xl border border-slate-200 p-4 sm:grid-cols-[120px_1fr_1fr_180px] sm:items-center">
                <p className="font-black">{code}</p>
                <p>{customer}</p>
                <p className="text-slate-600">{vehicle}</p>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-center text-xs font-bold text-blue-700">{status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
          <Bell className="h-8 w-8 text-blue-300" />
          <h2 className="mt-4 text-xl font-black">Avisar cliente</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Quando a OS muda para pronta, o sistema pode enviar e-mail informando que o veículo está liberado para retirada.</p>
          <button className="mt-6 w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950">Enviar aviso demo</button>
        </div>
      </div>
    </AppShell>
  );
}
