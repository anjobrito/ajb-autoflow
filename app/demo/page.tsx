import { ArrowRight, Bell, Car, ClipboardList, Gauge, Package, Users } from "lucide-react";

const steps = [
  {
    title: "1. Cadastre o cliente",
    description: "Registre nome, telefone, e-mail e cidade do cliente final da oficina ou lava-jato.",
    href: "/clientes/novo",
    icon: Users,
  },
  {
    title: "2. Cadastre o veículo",
    description: "Vincule placa, modelo, marca e quilometragem ao cliente para manter histórico.",
    href: "/veiculos/novo",
    icon: Car,
  },
  {
    title: "3. Abra a ordem de serviço",
    description: "Selecione cliente, veículo, serviço, produto e status do atendimento.",
    href: "/ordens-servico/nova",
    icon: ClipboardList,
  },
  {
    title: "4. Avise quando estiver pronto",
    description: "Use a página de detalhe da OS para avisar que o veículo está liberado para retirada.",
    href: "/ordens-servico",
    icon: Bell,
  },
];

const modules = [
  ["Clientes", "CRM operacional simples para pequenos negócios automotivos.", Users],
  ["Veículos", "Histórico por placa, modelo e cliente responsável.", Car],
  ["Estoque", "Produtos, peças e insumos usados nos serviços.", Package],
  ["Ordens", "Abertura, acompanhamento e conclusão de OS.", ClipboardList],
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6 py-8 text-white sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500">
              <Gauge className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">AJB AutoFlow</p>
              <p className="text-xs text-blue-100">by AJBSYSTEMS</p>
            </div>
          </a>
          <nav className="hidden items-center gap-3 sm:flex">
            <a href="/planos" className="rounded-full border border-white/20 px-5 py-2 text-sm font-bold text-white hover:bg-white/10">Planos</a>
            <a href="/comece-agora" className="rounded-full bg-white px-5 py-2 text-sm font-black text-slate-950">Comece agora</a>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-blue-700">Demonstração guiada</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Veja o fluxo principal do AJB AutoFlow em poucos minutos.</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">A ideia é simples: cadastrar o cliente, vincular o veículo, abrir a ordem de serviço e avisar quando estiver pronto.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/comece-agora" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-black text-white hover:bg-blue-700">
                Começar teste <ArrowRight className="h-5 w-5" />
              </a>
              <a href="/dashboard" className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-6 py-4 font-black text-slate-950 hover:bg-white">Abrir painel</a>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm">
            <p className="text-sm font-bold text-blue-300">Fluxo comercial</p>
            <h2 className="mt-2 text-2xl font-black">Cliente → Veículo → OS → Aviso</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">Esse é o argumento mais fácil para vender para oficina, lava-jato e estética automotiva.</p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <a key={step.title} href={step.href} className="rounded-[2rem] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-xl font-black">{step.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">Abrir etapa <ArrowRight className="h-4 w-4" /></span>
              </a>
            );
          })}
        </div>

        <div className="mt-12 rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-blue-700">Módulos do MVP</p>
              <h2 className="mt-2 text-3xl font-black">O necessário para uma primeira venda.</h2>
            </div>
            <a href="/planos" className="inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white">Ver planos</a>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {modules.map(([title, description, Icon]) => (
              <div key={title as string} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <Icon className="h-6 w-6 text-blue-700" />
                <p className="mt-4 font-black">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
