import { AppShell } from "@/components/app-shell";
import { FinanceClient } from "@/components/finance-client";
import { PageHeader } from "@/components/page-header";

export default function FinanceiroPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Financeiro operacional"
        title="Financeiro"
        description="Acompanhe faturamento, lucro estimado, ticket médio e margem geral das ordens de serviço para apoiar decisões comerciais do negócio automotivo."
      />
      <FinanceClient />
    </AppShell>
  );
}
