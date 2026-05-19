"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { UiModal } from "@/components/ui-modal";
import { listSuppliers, saveSupplier, StoredSupplier } from "@/lib/browser-store";
import { brazilianStates, getCitiesByState } from "@/lib/select-options";

const inputClass = "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white";
const labelClass = "grid gap-2 text-sm font-bold text-slate-700";

const demoRows = [
  ["Auto Peças Brasil", "12.111.222/0001-33", "(19) 3333-1000", "compras@pecasbrasil.com", "Araras/SP"],
  ["Distribuidora Óleo Max", "44.555.666/0001-77", "(19) 3333-2000", "vendas@oleomax.com", "Limeira/SP"],
];

export function SuppliersClient() {
  const [suppliers, setSuppliers] = useState<StoredSupplier[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedState, setSelectedState] = useState("SP");
  const cities = getCitiesByState(selectedState);

  function refresh() {
    setSuppliers(listSuppliers());
  }

  useEffect(() => {
    refresh();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    saveSupplier({
      name: String(formData.get("name") ?? ""),
      document: String(formData.get("document") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      city: String(formData.get("city") ?? ""),
      state: String(formData.get("state") ?? ""),
    });

    form.reset();
    setSelectedState("SP");
    refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
    setIsFormOpen(false);
  }

  const rows = [
    ...suppliers.map((supplier) => [supplier.name, supplier.document, supplier.phone, supplier.email, `${supplier.city}/${supplier.state}`]),
    ...demoRows,
  ];

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-blue-700">Cadastro</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">Fornecedores cadastrados</h2>
          <p className="mt-2 text-sm text-slate-600">Cadastre fornecedores em modal e mantenha a tela principal focada na listagem.</p>
        </div>
        <button type="button" onClick={() => setIsFormOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Novo fornecedor
        </button>
      </div>

      {saved ? <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">Fornecedor salvo!</div> : null}

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[840px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>{["Fornecedor", "CNPJ", "Telefone", "E-mail", "Cidade"].map((column) => <th key={column} className="px-5 py-4 font-black">{column}</th>)}</tr>
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

      <UiModal open={isFormOpen} title="Cadastrar fornecedor" description="Registre fornecedores para controlar origem, custo de peças/produtos e margem." onClose={() => setIsFormOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>Nome do fornecedor<input name="name" required placeholder="Ex: Auto Peças Brasil" className={inputClass} /></label>
            <label className={labelClass}>CNPJ<input name="document" required inputMode="numeric" placeholder="Ex: 12.111.222/0001-33" className={inputClass} /></label>
            <label className={labelClass}>Telefone<input name="phone" required inputMode="tel" placeholder="Ex: (19) 3333-1000" className={inputClass} /></label>
            <label className={labelClass}>E-mail<input name="email" required type="email" placeholder="Ex: vendas@fornecedor.com" className={inputClass} /></label>
            <label className={labelClass}>UF<select name="state" value={selectedState} onChange={(event) => setSelectedState(event.target.value)} className={inputClass}>{brazilianStates.map((state) => <option key={state}>{state}</option>)}</select></label>
            <label className={labelClass}>Cidade<select name="city" className={inputClass}>{cities.map((city) => <option key={city}>{city}</option>)}</select></label>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setIsFormOpen(false)} className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">Cancelar</button>
            <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar fornecedor</button>
          </div>
        </form>
      </UiModal>
    </div>
  );
}
