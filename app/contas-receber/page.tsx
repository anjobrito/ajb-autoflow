import { AppShell } from "@/components/app-shell";
import { FinanceAccountsClient } from "@/components/finance-accounts-client";
import { PageHeader } from "@/components/page-header";

export default function ContasReceberPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Financeiro operacional • AJB AutoFlow by AJBSYSTEMS"
        title="Contas a receber"
        description="Cadastre recebíveis de ordens de serviço, lavagens, vendas de peças e contratos para acompanhar as entradas previstas."
      />
      <FinanceAccountsClient mode="Receber" />
    </AppShell>
  );
}
