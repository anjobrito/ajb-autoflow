import { ArrowRight, CheckCircle2, Gauge } from "lucide-react";

const plans = [
  {
    name: "Start",
    price: "R$ 49,90",
    description: "Para oficina, lava-jato ou estética automotiva que quer começar simples.",
    features: ["Até 3 usuários", "Até 100 ordens de serviço/mês", "Clientes e veículos", "Estoque básico", "Avisos por e-mail"],
    highlight: true,
  },
  {
    name: "Pro",
    price: "R$ 79,90",
    description: "Para negócios que querem mais volume e recursos operacionais.",
    features: ["Usuários adicionais", "OS ilimitadas", "Lembretes de manutenção", "Relatórios operacionais", "Prioridade em melhorias"],
    highlight: false,
  },
  {
    name: "Add-ons",
    price: "Sob consulta",
    description: "Módulos pagos conforme necessidade do cliente.",
    features: ["SMS", "WhatsApp oficial", "Importação XML", "NFe futura", "Customizações comerciais"],
    highlight: false,
  },
];

export default function PlanosPage() {
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
          <a href="/comece-agora" className="rounded-full bg-white px-5 py-2 text-sm font-black text-slate-950">Comece agora</a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-wide text-blue-700">Planos simples</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Comece barato, venda rápido e evolua com clientes reais.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">O AJB AutoFlow nasce para pequenos negócios automotivos que precisam controlar OS, clientes, veículos e estoque pelo celular.</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-[2rem] p-6 shadow-sm ${plan.highlight ? "bg-slate-950 text-white" : "bg-white text-slate-950"}`}>
              <p className={plan.highlight ? "text-blue-300" : "text-blue-700"}>Plano</p>
              <h2 className="mt-2 text-3xl font-black">{plan.name}</h2>
              <p className="mt-4 text-5xl font-black">{plan.price}</p>
              <p className={`mt-3 text-sm leading-6 ${plan.highlight ? "text-slate-300" : "text-slate-600"}`}>{plan.description}</p>
              <div className="mt-6 grid gap-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm font-bold">
                    <CheckCircle2 className={plan.highlight ? "h-5 w-5 text-emerald-400" : "h-5 w-5 text-emerald-600"} />
                    {feature}
                  </div>
                ))}
              </div>
              <a href="/comece-agora" className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-black ${plan.highlight ? "bg-blue-500 text-white hover:bg-blue-400" : "bg-slate-950 text-white hover:bg-slate-800"}`}>
                Começar teste <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
