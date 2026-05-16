import { AppShell } from "@/components/app-shell";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";

const rows = [
  ["Troca de óleo", "João Pereira", "ABC1D23", "15/06/2026", "E-mail"],
  ["Lavagem mensal", "Carlos Lima", "CAR9F10", "22/05/2026", "WhatsApp futuro"],
  ["Revisão de freios", "Maria Souza", "BRA2E44", "01/07/2026", "E-mail"],
  ["Higienização", "Ana Martins", "AIB7S20", "10/06/2026", "SMS futuro"],
];

export default function LembretesPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Cliente voltando"
        title="Lembretes de manutenção"
        description="Programe retornos por data ou quilometragem para troca de óleo, revisão, lavagem ou estética."
        actionLabel="Novo lembrete"
      />
      <DataTable columns={["Lembrete", "Cliente", "Placa", "Vencimento", "Canal"]} rows={rows} />
    </AppShell>
  );
}
