"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { saveSupplier } from "@/lib/browser-store";
import { brazilianStates, commonCities } from "@/lib/select-options";

function Input({ name, label, placeholder, type = "text", inputMode }: { name: string; label: string; placeholder: string; type?: string; inputMode?: "numeric" | "tel" }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input type={type} inputMode={inputMode} name={name} required placeholder={placeholder} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" />
    </label>
  );
}

export default function NovoFornecedorPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    saveSupplier({
      name: String(formData.get("name") ?? ""),
      document: String(formData.get("document") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      city: String(formData.get("city") ?? ""),
      state: String(formData.get("state") ?? ""),
    });

    setSaved(true);
    setTimeout(() => router.push("/fornecedores"), 700);
  }

  return (
    <AppShell>
      <PageHeader eyebrow="Novo fornecedor" title="Cadastrar fornecedor" description="Registre fornecedores para controlar origem, custo das peças e margem de lucro." />
      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Input name="name" label="Nome do fornecedor" placeholder="Ex: Auto Peças Brasil" />
          <Input name="document" label="CNPJ" placeholder="Ex: 12.111.222/0001-33" inputMode="numeric" />
          <Input name="phone" label="Telefone" placeholder="Ex: (19) 3333-1000" inputMode="tel" />
          <Input name="email" label="E-mail" type="email" placeholder="Ex: vendas@fornecedor.com" />
          <label className="grid gap-2 text-sm font-bold text-slate-700">Cidade<select name="city" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{commonCities.map((city) => <option key={city}>{city}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">UF<select name="state" defaultValue="SP" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{brazilianStates.map((state) => <option key={state}>{state}</option>)}</select></label>
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          {saved ? <span className="text-sm font-bold text-emerald-700">Fornecedor salvo!</span> : null}
          <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar fornecedor</button>
        </div>
      </form>
    </AppShell>
  );
}
