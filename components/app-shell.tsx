import Link from "next/link";
import type { ReactNode } from "react";
import {
  BadgeDollarSign,
  Bell,
  Building2,
  Car,
  ClipboardList,
  Gauge,
  HandCoins,
  History,
  LayoutDashboard,
  Package,
  Receipt,
  Settings,
  UserRoundCog,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";

const menuGroups = [
  {
    title: "Geral",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: Gauge },
      { label: "Lembretes", href: "/lembretes", icon: Bell },
    ],
  },
  {
    title: "Operação",
    items: [
      { label: "Ordens", href: "/ordens-servico", icon: ClipboardList },
      { label: "Pátio", href: "/patio", icon: LayoutDashboard },
      { label: "Veículos", href: "/veiculos", icon: Car },
      { label: "Histórico", href: "/historico-veiculo", icon: History },
    ],
  },
  {
    title: "Cadastros",
    items: [
      { label: "Clientes", href: "/clientes", icon: Users },
      { label: "Fornecedores", href: "/fornecedores", icon: Building2 },
      { label: "Funcionários", href: "/funcionarios", icon: UserRoundCog },
      { label: "Estoque", href: "/produtos", icon: Package },
      { label: "Serviços", href: "/servicos", icon: Wrench },
    ],
  },
  {
    title: "Financeiro",
    items: [
      { label: "Financeiro", href: "/financeiro", icon: BadgeDollarSign },
      { label: "Contas a pagar", href: "/contas-pagar", icon: Wallet },
      { label: "Contas a receber", href: "/contas-receber", icon: Receipt },
      { label: "Comissões", href: "/comissoes", icon: HandCoins },
    ],
  },
  {
    title: "Revenda",
    items: [
      { label: "Financ. e Gravames", href: "/financiamentos-gravames", icon: ClipboardList },
    ],
  },
  {
    title: "Sistema",
    items: [
      { label: "Empresa", href: "/empresa", icon: Settings },
    ],
  },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl bg-slate-950 p-5 text-white lg:min-h-[calc(100vh-48px)]">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <p className="font-black">AJB AutoFlow</p>
              <p className="text-xs text-slate-300">by AJBSYSTEMS</p>
            </div>
          </Link>

          <nav className="mt-8 grid gap-5 text-sm font-semibold text-slate-200">
            {menuGroups.map((group) => (
              <div key={group.title} className="grid gap-2">
                <p className="px-4 text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">
                  {group.title}
                </p>
                <div className="grid gap-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-white/10"
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>
        <section className="grid gap-6">{children}</section>
      </div>
    </main>
  );
}
