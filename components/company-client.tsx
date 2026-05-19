"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { getCompany, saveCompany, StoredCompany } from "@/lib/browser-store";
import { businessTypes, getBusinessProfileByLabel } from "@/lib/business-types";
import { brazilianStates, getCitiesByState, normalizeCityForState } from "@/lib/select-options";

function Input({ label, name, value, onChange }: { label: string; name: keyof StoredCompany; value: string; onChange: (name: keyof StoredCompany, value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input value={value} onChange={(event) => onChange(name, event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" />
    </label>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

export function CompanyClient() {
  const [company, setCompany] = useState<StoredCompany | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loaded = getCompany();
    const state = brazilianStates.includes(loaded.state as typeof brazilianStates[number]) ? loaded.state : "SP";
    setCompany({
      ...loaded,
      businessType: businessTypes.includes(loaded.businessType as typeof businessTypes[number]) ? loaded.businessType : "Completo / Multioperação",
      state,
      city: normalizeCityForState(loaded.city, state),
    });
  }, []);

  function updateField(name: keyof StoredCompany, value: string) {
    setCompany((current) => {
      if (!current) return current;
      if (name === "state") {
        return { ...current, state: value, city: normalizeCityForState(current.city, value) };
      }
      return { ...current, [name]: value };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!company) return;
    saveCompany(company);
    window.dispatchEvent(new Event("ajb-company-updated"));
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  const selectedProfile = useMemo(() => getBusinessProfileByLabel(company?.businessType), [company?.businessType]);

  if (!company) return <div className="rounded-3xl bg-white p-6 shadow-sm">Carregando dados da empresa...</div>;

  const cities = getCitiesByState(company.state);

  const cards = [
    ["Nome fantasia", company.tradeName],
    ["Razão social", company.legalName],
    ["CNPJ", company.cnpj],
    ["Perfil de negócio", selectedProfile.label],
    ["Fluxo principal", selectedProfile.operationPluralLabel],
    ["Cidade/UF", `${company.city}/${company.state}`],
    ["Contato", `${company.phone} • ${company.email}`],
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-950">Configuração da empresa</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Escolha o perfil de negócio para o sistema adaptar menus, módulos, indicadores, fluxo operacional e linguagem ao universo real da empresa.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Input label="Nome fantasia" name="tradeName" value={company.tradeName} onChange={updateField} />
          <Input label="Razão social" name="legalName" value={company.legalName} onChange={updateField} />
          <Input label="CNPJ" name="cnpj" value={company.cnpj} onChange={updateField} />
          <SelectField label="Perfil de negócio" value={company.businessType} options={businessTypes} onChange={(value) => updateField("businessType", value)} />
          <SelectField label="Estado" value={company.state} options={brazilianStates} onChange={(value) => updateField("state", value)} />
          <SelectField label="Cidade" value={company.city} options={cities} onChange={(value) => updateField("city", value)} />
          <Input label="Telefone" name="phone" value={company.phone} onChange={updateField} />
          <Input label="E-mail" name="email" value={company.email} onChange={updateField} />
        </div>

        <div className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm font-black uppercase tracking-wide text-blue-700">Universo operacional</p>
          <h3 className="mt-1 text-lg font-black text-slate-950">{selectedProfile.label}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{selectedProfile.description}</p>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">Fluxo principal</p>
              <p className="mt-2 text-lg font-black text-slate-950">{selectedProfile.operationPluralLabel}</p>
              <p className="mt-1 text-sm text-slate-600">Nome operacional: {selectedProfile.operationLabel}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">Kanban sugerido</p>
              <p className="mt-2 text-lg font-black text-slate-950">{selectedProfile.kanbanLabel}</p>
              <p className="mt-1 text-sm text-slate-600">Base para adaptar colunas por perfil.</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Módulos recomendados</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedProfile.modules.map((module) => <span key={module} className="rounded-full bg-white px-3 py-1 text-xs font-black text-blue-700 shadow-sm">{module}</span>)}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Status do Kanban</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedProfile.kanbanStatuses.map((status) => <span key={status} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700 shadow-sm">{status}</span>)}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Indicadores sugeridos para o Dashboard</p>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {selectedProfile.dashboardCards.map((card) => <span key={card} className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm">{card}</span>)}
            </div>
          </div>

          <p className="mt-5 text-xs font-semibold text-slate-500">Nesta fase o perfil adapta menus e documenta o contexto operacional. A próxima evolução deve aplicar esses nomes, status e indicadores no Dashboard e no Kanban reais.</p>
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
