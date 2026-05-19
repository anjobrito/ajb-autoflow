import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ProductsClient } from "@/components/products-client";

export default function ProdutosPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Peças, produtos e insumos"
        title="Estoque"
        description="Controle saldo atual, estoque mínimo, custo e preço de venda por empresa."
      />
      <ProductsClient />
    </AppShell>
  );
}
