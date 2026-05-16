"use client";

import { FormEvent, useEffect, useState } from "react";
import { getCompany, saveCompany, StoredCompany } from "@/lib/browser-store";

function Input({ label, name, value, onChange }: { label: string; name: keyof StoredCompany; value: string; onChange: (name: keyof StoredCompany, value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input value={value} onChange={(event) => onChange(name, event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" />
    </label>
  );
}

export function CompanyClient() {
  const [company, setCompany] = useState<StoredCompany | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setCompany(getCompany());
  }, []);

  function updateField(name: keyof StoredCompany, value: string) {
    setCompany((current) => current ? { ...current, [name]: value } : current);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!company) return;
    saveCompany(company);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  if (!company) {
    return <div className="rounded-3xl bg-white p-6 shadow-sm">Carregando dados da empresa...</div>;
  }

  const cards = [
    ["Nome fantasia", company.tradeName],
    ["Razão social", company.legalName],
    ["CNPJ", company.cnpj],
    ["Segmento", company.businessType],
    ["Cidade/UF", `${company.city}/${company.state}`],
    ["Contato", `${company.phone} • ${company.email}`],
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-950">Configuração da empresa</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Esses dados representam o cliente pagante: oficina, lava-jato, estética ou centro automotivo.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Input label="Nome fantasia" name="tradeName" value={company.tradeName} onChange={updateField} />
          <Input label="Razão social" name="legalName" value={company.legalName} onChange={updateField} />
          <Input label="CNPJ" name="cnpj" value={company.cnpj} onChange={updateField} />
          <Input label="Segmento" name="businessType" value={company.businessType} onChange={updateField} />
          <Input label="Cidade" name="city" value={company.city} onChange={updateField} />
          <Input label="Estado" name="state" value={company.state} onChange={updateField} />
          <Input label="Telefone" name="phone" value={company.phone} onChange={updateField} />
          <Input label="E-mail" name="email" value={company.email} onChange={updateField} />
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          {saved ? <span className="text-sm font-bold text-emerald-700">Empresa salva!</span> : null}
          <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar empresa</button>
        </div>
      </form>

      <div className="grid gap-4">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-slate-500">{label}</p>
            <p className="mt-2 text-lg font-black text-slate-950">{value}</p>
          </div>
        ))}
        <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
          <p className="text-sm font-bold text-blue-300">Plano atual</p>
          <p className="mt-2 text-3xl font-black">Start</p>
          <p className="mt-2 text-sm text-slate-300">R$ 49,90/mês • trial ativo</p>
        </div>
      </div>
    </div>
  );
}
