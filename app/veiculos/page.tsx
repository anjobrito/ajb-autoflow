import { AppShell } from "@/components/app-shell";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";

const rows = [
  ["ABC1D23", "Honda Civic", "João Pereira", "82.450 km", "Revisão em 30 dias"],
  ["BRA2E44", "Fiat Argo", "Maria Souza", "41.900 km", "Troca de óleo"],
  ["CAR9F10", "VW Gol", "Carlos Lima", "119.200 km", "Pronto para retirada"],
  ["AIB7S20", "Chevrolet Onix", "Ana Martins", "63.100 km", "Sem pendência"],
];

export default function VeiculosPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Histórico por placa"
        title="Veículos"
        description="Controle veículos atendidos, quilometragem, cliente responsável e próximos lembretes."
        actionLabel="Novo veículo"
      />
      <DataTable columns={["Placa", "Veículo", "Cliente", "Km atual", "Situação"]} rows={rows} />
    </AppShell>
  );
}
