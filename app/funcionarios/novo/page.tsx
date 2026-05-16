import { AppShell } from "@/components/app-shell";
import { NewEmployeeForm } from "@/components/new-employee-form";
import { PageHeader } from "@/components/page-header";

export default function NovoFuncionarioPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Novo cadastro"
        title="Cadastrar funcionário"
        description="Registre os dados básicos do colaborador para preparar o módulo de comissões e operação interna."
      />
      <NewEmployeeForm />
    </AppShell>
  );
}
