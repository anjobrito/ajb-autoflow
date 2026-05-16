import { AppShell } from "@/components/app-shell";
import { CustomersClient } from "@/components/customers-client";
import { PageHeader } from "@/components/page-header";

export default function ClientesPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="CRM operacional"
        title="Clientes"
        description="Cadastre os clientes da oficina ou lava-jato e acompanhe veículos, contatos e histórico."
        actionLabel="Novo cliente"
        actionHref="/clientes/novo"
      />
      <CustomersClient />
    </AppShell>
  );
}
