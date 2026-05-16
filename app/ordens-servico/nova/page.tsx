import { AppShell } from "@/components/app-shell";
import { NewWorkOrderForm } from "@/components/new-work-order-form";
import { PageHeader } from "@/components/page-header";

export default function NovaOrdemServicoPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Fluxo principal"
        title="Nova ordem de serviço"
        description="Monte a OS com cliente, veículo, serviços, produtos e status inicial."
      />
      <NewWorkOrderForm />
    </AppShell>
  );
}
