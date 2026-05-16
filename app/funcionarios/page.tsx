import { AppShell } from "@/components/app-shell";
import { EmployeesClient } from "@/components/employees-client";
import { PageHeader } from "@/components/page-header";

export default function FuncionariosPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Equipe operacional"
        title="Funcionários"
        description="Cadastre e acompanhe os funcionários da oficina, lava-jato ou centro automotivo."
        actionLabel="Novo funcionário"
        actionHref="/funcionarios/novo"
      />
      <EmployeesClient />
    </AppShell>
  );
}
