import { AppShell } from "@/components/app-shell";
import { NewFinancialEntryForm } from "@/components/new-financial-entry-form";
import { PageHeader } from "@/components/page-header";

export default function NovoLancamentoFinanceiroPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Novo lançamento"
        title="Cadastrar conta"
        description="Registre contas a pagar ou a receber para controle financeiro operacional da oficina."
      />
      <NewFinancialEntryForm />
    </AppShell>
  );
}
