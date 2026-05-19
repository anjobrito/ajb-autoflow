"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import {
  BadgeDollarSign,
  Bell,
  Building2,
  Car,
  ChevronDown,
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

type MenuItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

type MenuGroup = {
  title: string;
  description: string;
  items: MenuItem[];
};

const menuGroups: MenuGroup[] = [
  {
    title: "Geral",
    description: "visão e alertas",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: Gauge },
      { label: "Lembretes", href: "/lembretes", icon: Bell },
    ],
  },
  {
    title: "Operação",
    description: "rotina da oficina",
    items: [
      { label: "Ordens", href: "/ordens-servico", icon: ClipboardList },
      { label: "Pátio", href: "/patio", icon: LayoutDashboard },
      { label: "Veículos", href: "/veiculos", icon: Car },
      { label: "Histórico", href: "/historico-veiculo", icon: History },
    ],
  },
  {
    title: "Cadastros",
    description: "base operacional",
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
    description: "contas e comissões",
    items: [
      { label: "Financeiro", href: "/financeiro", icon: BadgeDollarSign },
      { label: "Contas a pagar", href: "/contas-pagar", icon: Wallet },
      { label: "Contas a receber", href: "/contas-receber", icon: Receipt },
      { label: "Comissões", href: "/comissoes", icon: HandCoins },
    ],
  },
  {
    title: "Revenda",
    description: "garagem e veículos",
    items: [
      { label: "Financ. e Gravames", href: "/financiamentos-gravames", icon: ClipboardList },
    ],
  },
  {
    title: "Sistema",
    description: "empresa e ajustes",
    items: [
      { label: "Empresa", href: "/empresa", icon: Settings },
    ],
  },
];

function findActiveGroup(pathname: string) {
  return menuGroups.find((group) => group.items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`)))?.title ?? "Geral";
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const activeGroup = useMemo(() => findActiveGroup(pathname), [pathname]);
  const [openGroups, setOpenGroups] = useState<string[]>([activeGroup]);

  function toggleGroup(title: string) {
    setOpenGroups((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title]);
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl bg-slate-950 p-5 text-white lg:sticky lg:top-6 lg:max-h-[calc(100vh-48px)] lg:overflow-hidden">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <p className="font-black">AJB AutoFlow</p>
              <p className="text-xs text-slate-300">by AJBSYSTEMS</p>
            </div>
          </Link>

          <nav className="mt-8 grid max-h-[calc(100vh-150px)] gap-3 overflow-y-auto pr-1 text-sm font-semibold text-slate-200">
            {menuGroups.map((group) => {
              const isOpen = openGroups.includes(group.title);
              const hasActiveItem = group.title === activeGroup;

              return (
                <div key={group.title} className="rounded-2xl border border-white/10 bg-white/[0.03]">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.title)}
                    className={`flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left transition ${hasActiveItem ? "bg-blue-500/20 text-white" : "hover:bg-white/10"}`}
                    aria-expanded={isOpen}
                  >
                    <span>
                      <span className="block text-sm font-black">{group.title}</span>
                      <span className="block text-[11px] font-semibold text-slate-400">{group.description}</span>
                    </span>
                    <ChevronDown className={`h-4 w-4 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen ? (
                    <div className="grid gap-1 px-2 pb-2">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${isActive ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </aside>
        <section className="grid gap-6">{children}</section>
      </div>
    </main>
  );
}
