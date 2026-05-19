import { AppShell } from "@/components/app-shell";
import { CommissionsClient } from "@/components/commissions-client";
import { PageHeader } from "@/components/page-header";

export default function ComissoesPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Comissões preparatórias"
        title="Comissões"
        description="Prepare regras comerciais por funcionário, serviço, peça/produto e lavagem para evoluir remuneração variável sem alterar o financeiro geral do MVP."
      />
      <CommissionsClient />
    </AppShell>
  );
}
