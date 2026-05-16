import { AppShell } from "@/components/app-shell";
import { CompanyClient } from "@/components/company-client";
import { PageHeader } from "@/components/page-header";

export default function EmpresaPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Tenant / empresa"
        title="Dados da empresa"
        description="Cada oficina ou lava-jato possui usuários, clientes, veículos, estoque e ordens isoladas por empresa."
      />
      <CompanyClient />
    </AppShell>
  );
}
