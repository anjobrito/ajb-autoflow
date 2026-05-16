import { AppShell } from "@/components/app-shell";
import { CommissionsClient } from "@/components/commissions-client";
import { PageHeader } from "@/components/page-header";

export default function ComissoesPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Comissões"
        title="Comissões"
        description="Configure regras de comissão por funcionário, serviço, peça/produto e lavagem sem alterar o financeiro geral."
        actionLabel="Nova comissão"
        actionHref="/comissoes/nova"
      />
      <CommissionsClient />
    </AppShell>
  );
}
