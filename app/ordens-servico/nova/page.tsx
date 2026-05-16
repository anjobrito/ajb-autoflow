import { AppShell } from "@/components/app-shell";
import { Field, FormCard, PrimaryButton, SelectField } from "@/components/form-card";
import { PageHeader } from "@/components/page-header";
import { demoCustomers, demoProducts, demoServices, demoVehicles } from "@/lib/demo-data";

export default function NovaOrdemServicoPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Fluxo principal"
        title="Nova ordem de serviço"
        description="Monte a OS com cliente, veículo, serviços, produtos e status inicial."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <FormCard title="Dados da OS" description="Esse é o fluxo mais importante para vender o produto: abrir, acompanhar e concluir atendimento.">
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField label="Cliente" options={demoCustomers.map((customer) => customer.name)} />
            <SelectField label="Veículo" options={demoVehicles.map((vehicle) => `${vehicle.plate} - ${vehicle.model}`)} />
            <SelectField label="Serviço principal" options={demoServices.map((service) => service.name)} />
            <SelectField label="Produto / peça" options={demoProducts.map((product) => product.name)} />
            <SelectField label="Status" options={["Aberta", "Em andamento", "Aguardando peça", "Pronta para retirada"]} />
            <Field label="Valor estimado" placeholder="Ex: R$ 238,00" />
          </div>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Observações
            <textarea className="min-h-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white" placeholder="Descreva o problema, serviço solicitado ou orientação ao mecânico." />
          </label>
          <div className="flex justify-end">
            <PrimaryButton>Criar ordem de serviço</PrimaryButton>
          </div>
        </FormCard>

        <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
          <p className="text-sm font-bold text-blue-300">Resumo da venda</p>
          <h2 className="mt-2 text-2xl font-black">OS simples, rápida e pelo celular.</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Esse formulário demonstra o coração do AIB AutoFlow: o atendente abre a OS, vincula cliente e veículo, baixa peças e avisa o cliente no fim.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-slate-200">
            <div className="rounded-2xl bg-white/10 p-4">1. Cliente chega ou agenda</div>
            <div className="rounded-2xl bg-white/10 p-4">2. OS é criada no celular</div>
            <div className="rounded-2xl bg-white/10 p-4">3. Serviço muda de status</div>
            <div className="rounded-2xl bg-white/10 p-4">4. Cliente recebe aviso</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
