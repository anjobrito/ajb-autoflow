import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { SuppliersClient } from "@/components/suppliers-client";

export default function FornecedoresPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Compras e margem"
        title="Fornecedores"
        description="Cadastre fornecedores de peças, óleos, produtos e insumos para controlar custo e lucro."
        actionLabel="Novo fornecedor"
        actionHref="/fornecedores/novo"
      />
      <SuppliersClient />
    </AppShell>
  );
}
