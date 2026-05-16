import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { VehiclesClient } from "@/components/vehicles-client";

export default function VeiculosPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Histórico por placa"
        title="Veículos"
        description="Controle veículos atendidos, quilometragem, cliente responsável e próximos lembretes."
        actionLabel="Novo veículo"
        actionHref="/veiculos/novo"
      />
      <VehiclesClient />
    </AppShell>
  );
}
