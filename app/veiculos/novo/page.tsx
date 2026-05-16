import { AppShell } from "@/components/app-shell";
import { NewVehicleForm } from "@/components/new-vehicle-form";
import { PageHeader } from "@/components/page-header";

export default function NovoVeiculoPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Novo veículo"
        title="Cadastrar veículo"
        description="Vincule o veículo ao cliente para histórico, OS e lembretes por quilometragem."
      />
      <NewVehicleForm />
    </AppShell>
  );
}
