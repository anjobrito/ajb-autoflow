import { AppShell } from "@/components/app-shell";
import { InspectionFormClient } from "@/components/inspection-form-client";
import { PageHeader } from "@/components/page-header";

export default function VistoriaPage({ params }: { params: { id: string } }) {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Vistoria digital"
        title="Checklist de entrada"
        description="Registre quilometragem, combustível, objetos e avarias antes de iniciar o serviço."
      />
      <InspectionFormClient workOrderId={params.id} />
    </AppShell>
  );
}
