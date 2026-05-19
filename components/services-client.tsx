"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { UiModal } from "@/components/ui-modal";
import { demoServices } from "@/lib/demo-data";
import { filterServicesByBusinessProfile, getOperationalFormLabels } from "@/lib/business-domain-options";
import { getBusinessProfileByLabel } from "@/lib/business-profiles";
import { getCompany, listServices, saveService, StoredService } from "@/lib/browser-store";
import { serviceCategories, serviceStatuses } from "@/lib/select-options";

const inputClass = "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white";
const labelClass = "grid gap-2 text-sm font-bold text-slate-700";

export function ServicesClient() {
  const [services, setServices] = useState<StoredService[]>([]);
  const [businessType, setBusinessType] = useState("Completo / Multioperação");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const profile = useMemo(() => getBusinessProfileByLabel(businessType), [businessType]);
  const labels = useMemo(() => getOperationalFormLabels(profile), [profile]);
  const rows = useMemo(() => filterServicesByBusinessProfile([...services, ...demoServices], profile), [services, profile]);

  function refresh() {
    setBusinessType(getCompany().businessType || "Completo / Multioperação");
    setServices(listServices());
  }

  useEffect(() => {
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("ajb-company-updated", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("ajb-company-updated", refresh);
    };
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

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-blue-700">Cadastro</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">{labels.serviceLabel}s cadastrados</h2>
          <p className="mt-2 text-sm text-slate-600">Lista adaptada ao perfil {profile.label}. Evita exibir serviços, etapas ou pacotes de outro universo.</p>
        </div>
        <button type="button" onClick={() => setIsFormOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Novo {labels.serviceLabel.toLowerCase()}
        </button>
      </div>

      {saved ? <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">Cadastro salvo!</div> : null}

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>{[labels.serviceLabel, "Categoria", "Tempo médio", "Preço", "Status"].map((column) => <th key={column} className="px-5 py-4 font-black">{column}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row, rowIndex) => (
                <tr key={`${row.id}-${rowIndex}`} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-black text-slate-950">{row.name}</td>
                  <td className="px-5 py-4 text-slate-700">{row.category}</td>
                  <td className="px-5 py-4 text-slate-700">{row.duration}</td>
                  <td className="px-5 py-4 text-slate-700">{row.price}</td>
                  <td className="px-5 py-4 text-slate-700">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UiModal open={isFormOpen} title={`Cadastrar ${labels.serviceLabel.toLowerCase()}`} description={`Cadastre opções respeitando o perfil ${profile.label}.`} onClose={() => setIsFormOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>Nome<input name="name" required placeholder="Ex: Preparação" className={inputClass} /></label>
            <label className={labelClass}>Categoria<select name="category" className={inputClass}>{serviceCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className={labelClass}>Tempo médio<input name="duration" required inputMode="numeric" placeholder="Ex: 45 min" className={inputClass} /></label>
            <label className={labelClass}>Preço<input name="price" required inputMode="decimal" placeholder="Ex: R$ 80,00" className={inputClass} /></label>
            <label className={labelClass}>Status<select name="status" className={inputClass}>{serviceStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setIsFormOpen(false)} className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">Cancelar</button>
            <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar cadastro</button>
          </div>
        </form>
      </UiModal>
    </div>
  );
}
