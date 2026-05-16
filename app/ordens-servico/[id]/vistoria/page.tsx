import { AppShell } from "@/components/app-shell";
import { InspectionFormClient } from "@/components/inspection-form-client";
import { PageHeader } from "@/components/page-header";

type VistoriaPageProps = {
  params: Promise<{ id: string }>;
};

export default async function VistoriaPage({ params }: VistoriaPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Vistoria digital"
        title="Checklist de entrada"
        description="Registre quilometragem, combustível, objetos e avarias antes de iniciar o serviço."
      />
      <InspectionFormClient workOrderId={id} />
    </AppShell>
  );
}
