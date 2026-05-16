import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { RemindersClient } from "@/components/reminders-client";

export default function LembretesPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Cliente voltando"
        title="Lembretes inteligentes"
        description="A tela muda conforme o tipo de negócio: oficina, lava-jato, estética ou autopeças."
        actionLabel="Novo lembrete"
        actionHref="/lembretes/novo"
      />
      <RemindersClient />
    </AppShell>
  );
}
