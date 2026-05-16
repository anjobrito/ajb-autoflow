import { AppShell } from "@/components/app-shell";
import { FinancialEntriesClient } from "@/components/financial-entries-client";
import { PageHeader } from "@/components/page-header";

export default function ContasFinanceirasPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Financeiro operacional"
        title="Contas a pagar e a receber"
        description="Cadastre e acompanhe lançamentos financeiros da operação sem alterar o resumo financeiro das ordens de serviço."
        actionLabel="Novo lançamento"
        actionHref="/financeiro/contas/novo"
      />
      <FinancialEntriesClient />
    </AppShell>
  );
}
