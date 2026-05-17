import { AppShell } from "@/components/app-shell";
import { FinanceAccountsClient } from "@/components/finance-accounts-client";
import { PageHeader } from "@/components/page-header";

export default function Page() {
  return (
    <AppShell>
      <PageHeader eyebrow="Financeiro operacional" title="Contas a receber" description="Cadastre e acompanhe entradas financeiras previstas." />
      <FinanceAccountsClient mode="Receber" />
    </AppShell>
  );
}
