import { AppShell } from "@/components/app-shell";
import { Field, FormCard, PrimaryButton, SelectField } from "@/components/form-card";
import { PageHeader } from "@/components/page-header";
import { demoCustomers } from "@/lib/demo-data";

export default function NovoVeiculoPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Novo veículo"
        title="Cadastrar veículo"
        description="Vincule o veículo ao cliente para histórico, OS e lembretes por quilometragem."
      />
      <FormCard title="Dados do veículo" description="Use placa, modelo e quilometragem para acelerar a abertura de ordens de serviço.">
        <div className="grid gap-4 md:grid-cols-2">
          <SelectField label="Cliente" options={demoCustomers.map((customer) => customer.name)} />
          <Field label="Placa" placeholder="Ex: ABC1D23" />
          <Field label="Marca" placeholder="Ex: Honda" />
          <Field label="Modelo" placeholder="Ex: Civic" />
          <Field label="Ano" placeholder="Ex: 2020" />
          <Field label="Quilometragem" placeholder="Ex: 82450" />
        </div>
        <div className="flex justify-end">
          <PrimaryButton>Salvar veículo</PrimaryButton>
        </div>
      </FormCard>
    </AppShell>
  );
}
