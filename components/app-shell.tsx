import Link from "next/link";
import { BadgeDollarSign, Bell, Building2, Car, ClipboardList, Gauge, HandCoins, History, LayoutDashboard, Package, Settings, Users, Wrench } from "lucide-react";

const menu = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  { label: "Pátio", href: "/patio", icon: LayoutDashboard },
  { label: "Clientes", href: "/clientes", icon: Users },
  { label: "Veículos", href: "/veiculos", icon: Car },
  { label: "Histórico", href: "/historico-veiculo", icon: History },
  { label: "Fornecedores", href: "/fornecedores", icon: Building2 },
  { label: "Estoque", href: "/produtos", icon: Package },
  { label: "Serviços", href: "/servicos", icon: Wrench },
  { label: "Ordens", href: "/ordens-servico", icon: ClipboardList },
  { label: "Financeiro", href: "/financeiro", icon: BadgeDollarSign },
  { label: "Comissões", href: "/comissoes", icon: HandCoins },
  { label: "Lembretes", href: "/lembretes", icon: Bell },
  { label: "Empresa", href: "/empresa", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl bg-slate-950 p-5 text-white lg:min-h-[calc(100vh-48px)]">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <p className="font-black">AJB AutoFlow</p>
              <p className="text-xs text-slate-300">Oficina Demo</p>
            </div>
          </Link>
          <nav className="mt-8 grid gap-2 text-sm font-semibold text-slate-200">
            {menu.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/10">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <section className="grid gap-6">{children}</section>
      </div>
    </main>
  );
}
