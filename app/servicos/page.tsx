import { AppShell } from "@/components/app-shell";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";

const rows = [
  ["Troca de óleo", "Manutenção preventiva", "45 min", "R$ 80,00", "Ativo"],
  ["Alinhamento", "Suspensão", "60 min", "R$ 120,00", "Ativo"],
  ["Lavagem completa", "Lava-jato", "90 min", "R$ 70,00", "Ativo"],
  ["Higienização interna", "Estética", "180 min", "R$ 280,00", "Ativo"],
];

export default function ServicosPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Tabela de serviços"
        title="Serviços"
        description="Cadastre serviços de oficina, lava-jato, estética automotiva e centros automotivos."
        actionLabel="Novo serviço"
      />
      <DataTable columns={["Serviço", "Categoria", "Tempo médio", "Preço", "Status"]} rows={rows} />
    </AppShell>
  );
}
