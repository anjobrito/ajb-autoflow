import { AppShell } from "@/components/app-shell";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";

const rows = [
  ["Óleo 5W30 Sintético", "Lubrificante", "24", "6", "R$ 42,90"],
  ["Filtro de óleo", "Filtros", "12", "10", "R$ 28,00"],
  ["Pastilha de freio dianteira", "Freios", "4", "5", "R$ 189,90"],
  ["Shampoo automotivo", "Lava-jato", "9", "3", "R$ 34,90"],
];

export default function ProdutosPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Peças, produtos e insumos"
        title="Estoque"
        description="Controle saldo atual, estoque mínimo, custo e preço de venda por empresa."
        actionLabel="Novo item"
      />
      <DataTable columns={["Produto", "Categoria", "Saldo", "Mínimo", "Preço"]} rows={rows} />
    </AppShell>
  );
}
