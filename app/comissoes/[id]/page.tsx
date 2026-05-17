import { AppShell } from "@/components/app-shell";
import { CommissionDetailClient } from "@/components/commission-detail-client";
import { PageHeader } from "@/components/page-header";

type ComissaoDetalhePageProps = {
  params: Promise<{ id: string }>;
};

export default async function ComissaoDetalhePage({ params }: ComissaoDetalhePageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Detalhe da comissão"
        title="Comissão"
        description="Consulte origem, cálculo, histórico, status e vínculo financeiro da comissão."
        actionLabel="Voltar para comissões"
        actionHref="/comissoes"
      />
      <CommissionDetailClient id={id} />
    </AppShell>
  );
}
