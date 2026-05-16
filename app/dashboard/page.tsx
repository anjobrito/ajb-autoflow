import { AppShell } from "@/components/app-shell";
import { DashboardClient } from "@/components/dashboard-client";
import { PageHeader } from "@/components/page-header";

export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="SaaS multiempresa • AJB AutoFlow by AJBSYSTEMS"
        title="Controle comercial e operacional do negócio automotivo"
        description="Visão executiva para acompanhar oficina, lava-jato, estética automotiva, autopeças, pátio, margem, financeiro operacional e relacionamento com o cliente."
        actionLabel="Criar primeira OS"
        actionHref="/ordens-servico/nova"
      />
      <DashboardClient />
    </AppShell>
  );
}
