import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";

export default function VehicleFinancingPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Nova vertical • Revendas, garagens e estacionamentos"
        title="Financiamentos e Gravames"
        description="Módulo em preparação para controlar contratos, bancos, veículos, clientes, retorno financeiro, pendências documentais e status de gravame dentro do AJB AutoFlow."
      />

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-wide text-blue-700">MVP em implantação</p>
        <h2 className="mt-2 text-2xl font-black">Frente criada sem alterar a main</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Esta rota reserva o espaço do módulo Financiamentos e Gravames. A próxima etapa é adicionar o storage local, dashboard, formulário, filtros e tabela na mesma branch, preservando layout, localStorage e selects para campos enumeráveis.
        </p>
      </section>
    </AppShell>
  );
}
