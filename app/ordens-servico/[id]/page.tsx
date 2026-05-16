import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { demoWorkOrders } from "@/lib/demo-data";

export default function OrdemServicoDetalhePage({ params }: { params: { id: string } }) {
  const order = demoWorkOrders.find((item) => item.id === params.id) ?? demoWorkOrders[2];

  return (
    <AppShell>
      <PageHeader
        eyebrow="Detalhe da OS"
        title={`${order.code} - ${order.status}`}
        description="Acompanhe o serviço, veja dados do cliente e envie aviso quando o veículo estiver pronto."
        actionLabel="Editar OS"
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black">Dados do atendimento</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Cliente", order.customer],
                ["Veículo", order.vehicle],
                ["Placa", order.plate],
                ["Serviço", order.service],
                ["Status", order.status],
                ["Total", order.total],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                  <p className="mt-2 font-black text-slate-950">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black">Linha do tempo</h2>
            <div className="mt-6 grid gap-4">
              {["OS aberta pelo atendente", "Serviço iniciado", "Peças separadas no estoque", "Veículo pronto para retirada"].map((item, index) => (
                <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">{index + 1}</div>
                  <div>
                    <p className="font-black">{item}</p>
                    <p className="text-sm text-slate-500">Registro demo do fluxo operacional.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
          <p className="text-sm font-bold text-blue-300">Mensagem ao cliente</p>
          <h2 className="mt-2 text-2xl font-black">Veículo pronto para retirada</h2>
          <p className="mt-4 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-slate-200">
            Olá, {order.customer}. O serviço do seu veículo {order.vehicle} placa {order.plate} foi finalizado pela AutoFlow Garage. Seu veículo já está disponível para retirada.
          </p>
          <form action="/api/notifications/vehicle-ready" method="post" className="mt-6">
            <input type="hidden" name="customer" value={order.customer} />
            <input type="hidden" name="vehicle" value={order.vehicle} />
            <input type="hidden" name="plate" value={order.plate} />
            <button className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950">Enviar aviso demo</button>
          </form>
          <p className="mt-4 text-xs leading-5 text-slate-400">No MVP real, esse botão usará Resend para e-mail e depois poderá evoluir para SMS ou WhatsApp oficial.</p>
        </div>
      </div>
    </AppShell>
  );
}
