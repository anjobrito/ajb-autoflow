import { AppShell } from "@/components/app-shell";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";

const rows = [
  ["João Pereira", "(19) 98888-1100", "joao@email.com", "Araras/SP", "3 veículos"],
  ["Maria Souza", "(19) 97777-2200", "maria@email.com", "Limeira/SP", "1 veículo"],
  ["Carlos Lima", "(19) 96666-3300", "carlos@email.com", "Rio Claro/SP", "2 veículos"],
  ["Ana Martins", "(19) 95555-4400", "ana@email.com", "Piracicaba/SP", "1 veículo"],
];

export default function ClientesPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="CRM operacional"
        title="Clientes"
        description="Cadastre os clientes da oficina ou lava-jato e acompanhe veículos, contatos e histórico."
        actionLabel="Novo cliente"
      />
      <DataTable columns={["Cliente", "Telefone", "E-mail", "Cidade", "Veículos"]} rows={rows} />
    </AppShell>
  );
}
