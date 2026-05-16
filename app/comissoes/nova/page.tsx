"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { listProducts, listServices, saveCommission, StoredProduct, StoredService } from "@/lib/browser-store";
import { commissionStatuses, commissionTargetTypes, commissionValueTypes } from "@/lib/select-options";

function Input({ name, label, placeholder, inputMode, required = true }: { name: string; label: string; placeholder: string; inputMode?: "numeric" | "decimal"; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input name={name} required={required} inputMode={inputMode} placeholder={placeholder} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" />
    </label>
  );
}

function Select({ name, label, children }: { name: string; label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <select name={name} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">
        {children}
      </select>
    </label>
  );
}

export default function NovaComissaoPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [services, setServices] = useState<StoredService[]>([]);
  const [products, setProducts] = useState<StoredProduct[]>([]);

  useEffect(() => {
    setServices(listServices());
    setProducts(listProducts());
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    saveCommission({
      employeeId: undefined,
      employeeName: String(formData.get("employeeName") ?? ""),
      targetType: String(formData.get("targetType") ?? "Serviço"),
      targetName: String(formData.get("targetName") ?? ""),
      valueType: String(formData.get("valueType") ?? "Percentual"),
      value: String(formData.get("value") ?? ""),
      status: String(formData.get("status") ?? "Ativa"),
      notes: String(formData.get("notes") ?? ""),
    });

    setSaved(true);
    setTimeout(() => router.push("/comissoes"), 700);
  }

  const targetOptions = [
    ...services.map((service) => service.name),
    ...products.map((product) => product.name),
    "Lavagem simples",
    "Lavagem completa",
    "Higienização interna",
    "Outro",
  ];
  const uniqueTargetOptions = Array.from(new Set(targetOptions.filter(Boolean)));

  return (
    <AppShell>
      <PageHeader eyebrow="Nova comissão" title="Cadastrar comissão" description="Prepare regras de comissão sem impactar OS ou o cálculo financeiro geral." />
      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold text-amber-900">
          O módulo de funcionários ainda não foi encontrado nesta branch. Por isso, o vínculo foi mantido como nome livre agora e employeeId opcional no storage para integração futura.
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input name="employeeName" label="Funcionário" placeholder="Ex: João da Silva" />
          <Select name="targetType" label="Base da comissão">
            {commissionTargetTypes.map((type) => <option key={type}>{type}</option>)}
          </Select>
          <Select name="targetName" label="Serviço, produto/peça ou lavagem">
            {uniqueTargetOptions.length > 0 ? uniqueTargetOptions.map((target) => <option key={target}>{target}</option>) : <option>Outro</option>}
          </Select>
          <Select name="valueType" label="Tipo de comissão">
            {commissionValueTypes.map((type) => <option key={type}>{type}</option>)}
          </Select>
          <Input name="value" label="Valor da comissão" placeholder="Ex: 10% ou R$ 15,00" inputMode="decimal" />
          <Select name="status" label="Status">
            {commissionStatuses.map((status) => <option key={status}>{status}</option>)}
          </Select>
          <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
            Observações
            <textarea name="notes" rows={4} placeholder="Regras internas, exceções ou observações da comissão" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" />
          </label>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          {saved ? <span className="text-sm font-bold text-emerald-700">Comissão salva!</span> : null}
          <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar comissão</button>
        </div>
      </form>
    </AppShell>
  );
}
