import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { WorkOrdersClient } from "@/components/work-orders-client";

export default function OrdensServicoPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Atendimento operacional"
        title="Ordens de serviço"
        description="Abra OS, acompanhe status, calcule serviços/produtos e avise o cliente quando estiver pronto."
        actionLabel="Nova OS"
        actionHref="/ordens-servico/nova"
      />
      <WorkOrdersClient />
    </AppShell>
  );
}
