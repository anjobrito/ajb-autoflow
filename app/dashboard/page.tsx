import { AppShell } from "@/components/app-shell";
import { DashboardClient } from "@/components/dashboard-client";
import { PageHeader } from "@/components/page-header";

export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Painel mobile-first"
        title="Controle da oficina"
        description="Visão rápida de atendimento, clientes, veículos, estoque e avisos."
        actionLabel="Nova OS"
        actionHref="/ordens-servico/nova"
      />
      <DashboardClient />
    </AppShell>
  );
}
