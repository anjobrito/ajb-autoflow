import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { WorkOrderDetailClient } from "@/components/work-order-detail-client";

export default function OrdemServicoDetalhePage({ params }: { params: { id: string } }) {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Detalhe da OS"
        title="Ordem de serviço"
        description="Acompanhe o serviço, veja dados do cliente e envie aviso quando o veículo estiver pronto."
        actionLabel="Nova OS"
        actionHref="/ordens-servico/nova"
      />
      <WorkOrderDetailClient id={params.id} />
    </AppShell>
  );
}
