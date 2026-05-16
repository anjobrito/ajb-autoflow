import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { WorkOrderDetailClient } from "@/components/work-order-detail-client";

type OrdemServicoDetalhePageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrdemServicoDetalhePage({ params }: OrdemServicoDetalhePageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Detalhe da OS"
        title="Ordem de serviço"
        description="Acompanhe o serviço, veja dados do cliente e envie aviso quando o veículo estiver pronto."
        actionLabel="Nova OS"
        actionHref="/ordens-servico/nova"
      />
      <WorkOrderDetailClient id={id} />
    </AppShell>
  );
}
