"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { UiModal } from "@/components/ui-modal";
import { demoCustomers } from "@/lib/demo-data";
import { listCustomers, saveCustomer, StoredCustomer } from "@/lib/browser-store";
import { brazilianStates, commonCities } from "@/lib/select-options";

const inputClass = "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white";
const labelClass = "grid gap-2 text-sm font-bold text-slate-700";

export function CustomersClient() {
  const [customers, setCustomers] = useState<StoredCustomer[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  function refresh() {
    setCustomers(listCustomers());
  }

  useEffect(() => {
    refresh();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    saveCustomer({
      name: String(formData.get("name") ?? ""),
      document: String(formData.get("document") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      city: String(formData.get("city") ?? ""),
      state: String(formData.get("state") ?? ""),
    });

    form.reset();
    refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
    setIsFormOpen(false);
  }

  const rows = [
    ...customers.map((customer) => [customer.name, customer.phone, customer.email, `${customer.city}/${customer.state}`, "Novo cadastro"]),
    ...demoCustomers.map((customer) => [customer.name, customer.phone, customer.email, `${customer.city}/${customer.state}`, "Demo"]),
  ];

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-blue-700">Cadastro</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">Clientes cadastrados</h2>
          <p className="mt-2 text-sm text-slate-600">Mantenha a tela limpa e cadastre clientes em uma janela modal.</p>
        </div>
        <button type="button" onClick={() => setIsFormOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Novo cliente
        </button>
      </div>

      {saved ? <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">Cliente salvo!</div> : null}

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {['Cliente', 'Telefone', 'E-mail', 'Cidade', 'Origem'].map((column) => (
                  <th key={column} className="px-5 py-4 font-black">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row, rowIndex) => (
                <tr key={`${row[0]}-${rowIndex}`} className="hover:bg-slate-50">
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`} className="px-5 py-4 text-slate-700">
                      {cellIndex === 0 ? <span className="font-black text-slate-950">{cell}</span> : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UiModal open={isFormOpen} title="Cadastrar cliente" description="Registre os dados do cliente para vínculos com veículos, atendimentos e lembretes." onClose={() => setIsFormOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>Nome completo<input required name="name" placeholder="Ex: João Pereira" autoComplete="name" className={inputClass} /></label>
            <label className={labelClass}>CPF/CNPJ<input name="document" inputMode="numeric" placeholder="Ex: 123.456.789-00" className={inputClass} /></label>
            <label className={labelClass}>Telefone / WhatsApp<input required name="phone" inputMode="tel" autoComplete="tel" placeholder="Ex: (19) 98888-1100" className={inputClass} /></label>
            <label className={labelClass}>E-mail<input name="email" type="email" autoComplete="email" placeholder="Ex: cliente@email.com" className={inputClass} /></label>
            <label className={labelClass}>Cidade<select name="city" className={inputClass}>{commonCities.map((city) => <option key={city}>{city}</option>)}</select></label>
            <label className={labelClass}>UF<select name="state" defaultValue="SP" className={inputClass}>{brazilianStates.map((state) => <option key={state}>{state}</option>)}</select></label>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setIsFormOpen(false)} className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">Cancelar</button>
            <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar cliente</button>
          </div>
        </form>
      </UiModal>
    </div>
  );
}