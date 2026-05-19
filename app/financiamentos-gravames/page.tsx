import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { VehicleFinancingClient } from "@/components/vehicle-financing-client";

export default function VehicleFinancingPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Nova vertical • Revendas, garagens e estacionamentos"
        title="Financiamentos e Gravames"
        description="Controle contratos, bancos, veículos, clientes, retorno financeiro, pendências documentais e status de gravame em uma visão gerencial integrada ao AJB AutoFlow."
      />
      <VehicleFinancingClient />
    </AppShell>
  );
}
