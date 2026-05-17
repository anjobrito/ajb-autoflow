import { AppShell } from "@/components/app-shell";
import { CommissionEditForm } from "@/components/commission-edit-form";
import { PageHeader } from "@/components/page-header";

type EditarComissaoPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditarComissaoPage({ params }: EditarComissaoPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Editar comissão"
        title="Ajustar lançamento"
        description="Corrija dados, valor base, regra, status e observações da comissão mantendo o vínculo financeiro sincronizado."
        actionLabel="Voltar para comissões"
        actionHref="/comissoes"
      />
      <CommissionEditForm id={id} />
    </AppShell>
  );
}
