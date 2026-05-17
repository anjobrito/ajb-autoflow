import { AppShell } from "@/components/app-shell";
import { FinanceAccountsClient } from "@/components/finance-accounts-client";
import { PageHeader } from "@/components/page-header";

export default function ContasPagarPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Financeiro operacional • AJB AutoFlow by AJBSYSTEMS"
        title="Contas a pagar"
        description="Cadastre despesas, fornecedores, boletos, comissões e compromissos financeiros para controlar as saídas do negócio automotivo."
      />
      <FinanceAccountsClient mode="Pagar" />
    </AppShell>
  );
}
