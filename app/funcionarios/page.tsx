import { AppShell } from "@/components/app-shell";
import { EmployeesClient } from "@/components/employees-client";
import { PageHeader } from "@/components/page-header";

export default function FuncionariosPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Equipe operacional e comercial"
        title="Funcionários"
        description="Cadastre a equipe da oficina, lava-jato, estética automotiva ou centro automotivo para apoiar operação, atendimento e futuras comissões."
        actionLabel="Cadastrar primeiro funcionário"
        actionHref="/funcionarios/novo"
      />
      <EmployeesClient />
    </AppShell>
  );
}
