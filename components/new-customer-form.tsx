"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { saveCustomer } from "@/lib/browser-store";
import { brazilianStates, commonCities } from "@/lib/select-options";

export function NewCustomerForm() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    saveCustomer({
      name: String(formData.get("name") ?? ""),
      document: String(formData.get("document") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      city: String(formData.get("city") ?? ""),
      state: String(formData.get("state") ?? ""),
    });

    setSaved(true);
    setTimeout(() => router.push("/clientes"), 700);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-950">Dados do cliente</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Essas informações serão usadas nas ordens de serviço e nos lembretes de manutenção.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">Nome completo<input required name="name" placeholder="Ex: João Pereira" autoComplete="name" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">CPF/CNPJ<input name="document" inputMode="numeric" placeholder="Ex: 123.456.789-00" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Telefone / WhatsApp<input required name="phone" inputMode="tel" autoComplete="tel" placeholder="Ex: (19) 98888-1100" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">E-mail<input name="email" type="email" autoComplete="email" placeholder="Ex: cliente@email.com" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Cidade<select name="city" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{commonCities.map((city) => <option key={city}>{city}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">UF<select name="state" defaultValue="SP" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{brazilianStates.map((state) => <option key={state}>{state}</option>)}</select></label>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        {saved ? <span className="text-sm font-bold text-emerald-700">Cliente salvo!</span> : null}
        <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar cliente</button>
      </div>
    </form>
  );
}
