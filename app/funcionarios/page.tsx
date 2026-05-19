import { AppShell } from "@/components/app-shell";
import { EmployeesClient } from "@/components/employees-client";
import { PageHeader } from "@/components/page-header";

export default function FuncionariosPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Equipe operacional e comercial"
        title="Funcionários"
        description="Cadastre a equipe da empresa para apoiar operação, atendimento e futuras comissões."
      />
      <EmployeesClient />
    </AppShell>
  );
}
