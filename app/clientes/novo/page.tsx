import { AppShell } from "@/components/app-shell";
import { NewCustomerForm } from "@/components/new-customer-form";
import { PageHeader } from "@/components/page-header";

export default function NovoClientePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Novo cadastro"
        title="Cadastrar cliente"
        description="Registre os dados do cliente final da oficina ou lava-jato."
      />
      <NewCustomerForm />
    </AppShell>
  );
}
