import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { YardKanbanClient } from "@/components/yard-kanban-client";

export default function PatioPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Gestão de pátio"
        title="Kanban de veículos"
        description="Acompanhe visualmente cada veículo do atendimento até a entrega."
        actionLabel="Nova OS"
        actionHref="/ordens-servico/nova"
      />
      <YardKanbanClient />
    </AppShell>
  );
}
