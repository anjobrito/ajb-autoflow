"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { UiModal } from "@/components/ui-modal";
import { demoServices } from "@/lib/demo-data";
import { listServices, saveService, StoredService } from "@/lib/browser-store";
import { serviceCategories, serviceStatuses } from "@/lib/select-options";

const inputClass = "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white";
const labelClass = "grid gap-2 text-sm font-bold text-slate-700";

export function ServicesClient() {
  const [services, setServices] = useState<StoredService[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  function refresh() {
    setServices(listServices());
  }

  useEffect(() => {
    refresh();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    saveService({
      name: String(formData.get("name") ?? ""),
      category: String(formData.get("category") ?? ""),
      duration: String(formData.get("duration") ?? ""),
      price: String(formData.get("price") ?? "R$ 0,00"),
      status: String(formData.get("status") ?? "Ativo"),
    });

    form.reset();
    refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
    setIsFormOpen(false);
  }

  const rows = [
    ...services.map((service) => [service.name, service.category, service.duration, service.price, service.status]),
    ...demoServices.map((service) => [service.name, service.category, service.duration, service.price, service.status]),
  ];

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-blue-700">Cadastro</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">Serviços cadastrados</h2>
          <p className="mt-2 text-sm text-slate-600">Cadastre serviços em modal e mantenha a tabela principal limpa.</p>
        </div>
        <button type="button" onClick={() => setIsFormOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Novo serviço
        </button>
      </div>

      {saved ? <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">Serviço salvo!</div> : null}

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>{["Serviço", "Categoria", "Tempo médio", "Preço", "Status"].map((column) => <th key={column} className="px-5 py-4 font-black">{column}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row, rowIndex) => (
                <tr key={`${row[0]}-${rowIndex}`} className="hover:bg-slate-50">
                  {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className="px-5 py-4 text-slate-700">{cellIndex === 0 ? <span className="font-black text-slate-950">{cell}</span> : cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UiModal open={isFormOpen} title="Cadastrar serviço" description="Cadastre serviços e pacotes operacionais." onClose={() => setIsFormOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>Nome do serviço<input name="name" required placeholder="Ex: Lavagem completa" className={inputClass} /></label>
            <label className={labelClass}>Categoria<select name="category" className={inputClass}>{serviceCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className={labelClass}>Tempo médio<input name="duration" required inputMode="numeric" placeholder="Ex: 45 min" className={inputClass} /></label>
            <label className={labelClass}>Preço<input name="price" required inputMode="decimal" placeholder="Ex: R$ 80,00" className={inputClass} /></label>
            <label className={labelClass}>Status<select name="status" className={inputClass}>{serviceStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setIsFormOpen(false)} className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">Cancelar</button>
            <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar serviço</button>
          </div>
        </form>
      </UiModal>
    </div>
  );
}
