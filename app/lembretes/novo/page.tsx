"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { getBusinessProfile } from "@/lib/business-profile";
import { getCompany, listCustomers, listVehicles, saveReminder, StoredCustomer, StoredVehicle } from "@/lib/browser-store";

export default function NovoLembretePage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [customers, setCustomers] = useState<StoredCustomer[]>([]);
  const [vehicles, setVehicles] = useState<StoredVehicle[]>([]);
  const profile = getBusinessProfile(getCompany());

  useEffect(() => {
    setCustomers(listCustomers());
    setVehicles(listVehicles());
  }, []);

  const reminderTypes = profile.kind === "carwash"
    ? ["Lavagem mensal", "Lavagem completa", "Higienização interna", "Detalhamento"]
    : profile.kind === "parts"
      ? ["Reposição de filtros", "Compra recorrente de óleo", "Pastilhas de freio", "Reposição de estoque"]
      : ["Troca de óleo", "Revisão preventiva", "Revisão de freios", "Troca de filtros"];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    saveReminder({
      type: String(formData.get("type") ?? ""),
      customer: String(formData.get("customer") ?? ""),
      plate: String(formData.get("plate") ?? ""),
      dueDate: String(formData.get("dueDate") ?? ""),
      channel: String(formData.get("channel") ?? "E-mail"),
      message: String(formData.get("message") ?? ""),
    });

    setSaved(true);
    setTimeout(() => router.push("/lembretes"), 700);
  }

  return (
    <AppShell>
      <PageHeader eyebrow="Novo lembrete" title={profile.reminderTitle} description={profile.reminderDescription} />
      <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-700">Tipo de lembrete<select name="type" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{reminderTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">Cliente<select name="customer" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{customers.length ? customers.map((c) => <option key={c.id}>{c.name}</option>) : <option>Cliente demo</option>}</select></label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">Placa<select name="plate" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{vehicles.length ? vehicles.map((v) => <option key={v.id}>{v.plate}</option>) : <option>ABC1D23</option>}</select></label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">Vencimento<input name="dueDate" type="date" required className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">Canal<select name="channel" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white"><option>E-mail</option><option>WhatsApp futuro</option><option>SMS futuro</option></select></label>
          </div>
          <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">Mensagem<textarea name="message" defaultValue={profile.customerReturnMessage} className="min-h-28 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
          <div className="mt-6 flex items-center justify-end gap-3">
            {saved ? <span className="text-sm font-bold text-emerald-700">Lembrete salvo!</span> : null}
            <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar lembrete</button>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
          <p className="text-sm font-bold text-blue-300">Perfil aplicado</p>
          <h2 className="mt-2 text-2xl font-black">{profile.operationLabel}</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">Os tipos de lembrete desta tela mudam conforme o segmento configurado em Empresa.</p>
          <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm text-slate-200">{profile.customerReturnMessage}</div>
        </div>
      </form>
    </AppShell>
  );
}
