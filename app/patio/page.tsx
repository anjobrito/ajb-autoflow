import { AppShell } from "@/components/app-shell";
import { BusinessAwarePageHeader } from "@/components/business-aware-page-header";
import { YardKanbanClient } from "@/components/yard-kanban-client";

export default function PatioPage() {
  return (
    <AppShell>
      <BusinessAwarePageHeader context="yard" />
      <YardKanbanClient />
    </AppShell>
  );
}
