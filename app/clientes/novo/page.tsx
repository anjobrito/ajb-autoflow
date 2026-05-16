import { AppShell } from "@/components/app-shell";
import { Field, FormCard, PrimaryButton } from "@/components/form-card";
import { PageHeader } from "@/components/page-header";

export default function NovoClientePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Novo cadastro"
        title="Cadastrar cliente"
        description="Registre os dados do cliente final da oficina ou lava-jato."
      />
      <FormCard title="Dados do cliente" description="Essas informações serão usadas nas ordens de serviço e nos lembretes de manutenção.">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nome completo" placeholder="Ex: João Pereira" />
          <Field label="CPF/CNPJ" placeholder="Ex: 123.456.789-00" />
          <Field label="Telefone / WhatsApp" placeholder="Ex: (19) 98888-1100" />
          <Field label="E-mail" placeholder="Ex: cliente@email.com" type="email" />
          <Field label="Cidade" placeholder="Ex: Araras" />
          <Field label="Estado" placeholder="Ex: SP" />
        </div>
        <div className="flex justify-end">
          <PrimaryButton>Salvar cliente</PrimaryButton>
        </div>
      </FormCard>
    </AppShell>
  );
}
