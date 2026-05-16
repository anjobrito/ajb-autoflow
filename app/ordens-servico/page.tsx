import { AppShell } from "@/components/app-shell";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";

const rows = [
  ["OS-1024", "João Pereira", "Honda Civic", "Troca de óleo", "Em andamento", "R$ 238,00"],
  ["OS-1025", "Maria Souza", "Fiat Argo", "Freio dianteiro", "Aguardando peça", "R$ 640,00"],
  ["OS-1026", "Carlos Lima", "VW Gol", "Lavagem completa", "Pronta para retirada", "R$ 70,00"],
  ["OS-1027", "Ana Martins", "Chevrolet Onix", "Higienização", "Aberta", "R$ 280,00"],
];

export default function OrdensServicoPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Atendimento operacional"
        title="Ordens de serviço"
        description="Abra OS, acompanhe status, calcule serviços/produtos e avise o cliente quando estiver pronto."
        actionLabel="Nova OS"
      />
      <DataTable columns={["OS", "Cliente", "Veículo", "Serviço", "Status", "Total"]} rows={rows} />
    </AppShell>
  );
}
