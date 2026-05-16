import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";

const fields = [
  ["Nome fantasia", "Oficina Demo AutoFlow"],
  ["CNPJ", "12.345.678/0001-90"],
  ["Segmento", "Oficina mecânica e lava-jato"],
  ["Cidade/UF", "Araras/SP"],
  ["Plano", "Start - R$ 49,90/mês"],
  ["Status", "Trial ativo"],
];

export default function EmpresaPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Tenant / empresa"
        title="Dados da empresa"
        description="Cada oficina ou lava-jato possui usuários, clientes, veículos, estoque e ordens isoladas por empresa."
        actionLabel="Editar empresa"
      />
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map(([label, value]) => (
          <div key={label} className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-slate-500">{label}</p>
            <p className="mt-2 text-xl font-black text-slate-950">{value}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
