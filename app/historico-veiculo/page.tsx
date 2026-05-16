import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { VehicleHistoryClient } from "@/components/vehicle-history-client";

export default function HistoricoVeiculoPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Histórico clínico"
        title="Histórico do veículo"
        description="Consulte por placa tudo que já foi feito no veículo: OS, serviços, peças, valores e vistorias."
      />
      <VehicleHistoryClient />
    </AppShell>
  );
}
