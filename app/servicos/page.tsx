import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ServicesClient } from "@/components/services-client";

export default function ServicosPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Tabela de serviços"
        title="Serviços"
        description="Cadastre serviços de oficina, lava-jato, estética automotiva e centros automotivos."
      />
      <ServicesClient />
    </AppShell>
  );
}
