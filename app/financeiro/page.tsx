import { AppShell } from "@/components/app-shell";
import { FinanceClient } from "@/components/finance-client";
import { PageHeader } from "@/components/page-header";

export default function FinanceiroPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Gestão financeira"
        title="Financeiro"
        description="Veja faturamento, lucro estimado, ticket médio e margem geral das ordens de serviço."
        actionLabel="Contas operacionais"
        actionHref="/financeiro/contas"
      />
      <FinanceClient />
    </AppShell>
  );
}
