"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { saveEmployee } from "@/lib/browser-store";
import { employeeCommissionTypes, employeeEmploymentTypes, employeeRoles, employeeStatuses } from "@/lib/select-options";

function TextInput({ name, label, placeholder, type = "text", inputMode, required = false, autoComplete }: { name: string; label: string; placeholder: string; type?: string; inputMode?: "text" | "tel" | "email" | "numeric" | "decimal"; required?: boolean; autoComplete?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input required={required} name={name} type={type} inputMode={inputMode} autoComplete={autoComplete} placeholder={placeholder} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" />
    </label>
  );
}

function SelectInput({ name, label, children, defaultValue, required = true }: { name: string; label: string; children: React.ReactNode; defaultValue?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <select required={required} name={name} defaultValue={defaultValue} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">
        {children}
      </select>
    </label>
  );
}

export function NewEmployeeForm() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    saveEmployee({
      name: String(formData.get("name") ?? ""),
      cpf: String(formData.get("cpf") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      role: String(formData.get("role") ?? ""),
      employmentType: String(formData.get("employmentType") ?? ""),
      status: String(formData.get("status") ?? ""),
      serviceCommissionType: String(formData.get("serviceCommissionType") ?? "Sem comissão"),
      serviceCommissionValue: String(formData.get("serviceCommissionValue") ?? ""),
      partCommissionType: String(formData.get("partCommissionType") ?? "Sem comissão"),
      partCommissionValue: String(formData.get("partCommissionValue") ?? ""),
      washCommissionType: String(formData.get("washCommissionType") ?? "Sem comissão"),
      washCommissionValue: String(formData.get("washCommissionValue") ?? ""),
    });

    setSaved(true);
    setTimeout(() => router.push("/funcionarios"), 700);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-950">Dados do funcionário</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Essas informações preparam a base operacional para equipe, vínculos e regras de comissão por serviço, produto/peça e lavagem.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput required name="name" label="Nome completo" placeholder="Ex: Carlos Almeida" autoComplete="name" />
        <TextInput name="cpf" label="CPF" inputMode="numeric" placeholder="Ex: 123.456.789-00" />
        <TextInput required name="phone" label="Telefone / WhatsApp" inputMode="tel" autoComplete="tel" placeholder="Ex: (19) 98888-1100" />
        <TextInput name="email" label="E-mail" type="email" inputMode="email" autoComplete="email" placeholder="Ex: funcionario@email.com" />
        <SelectInput name="role" label="Cargo/função">
          {employeeRoles.map((role) => <option key={role}>{role}</option>)}
        </SelectInput>
        <SelectInput name="employmentType" label="Tipo de vínculo">
          {employeeEmploymentTypes.map((type) => <option key={type}>{type}</option>)}
        </SelectInput>
        <SelectInput name="status" label="Status" defaultValue="Ativo">
          {employeeStatuses.map((status) => <option key={status}>{status}</option>)}
        </SelectInput>
      </div>

      <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-5">
        <h3 className="text-lg font-black text-blue-950">Regras de comissão do funcionário</h3>
        <p className="mt-2 text-sm leading-6 font-semibold text-blue-900">Informe percentuais como 10% e valores fixos como R$ 15,00. Essas regras servem de referência para o lançamento manual de comissões nesta versão do MVP.</p>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SelectInput name="serviceCommissionType" label="Comissão em serviços" defaultValue="Sem comissão">
          {employeeCommissionTypes.map((type) => <option key={type}>{type}</option>)}
        </SelectInput>
        <TextInput name="serviceCommissionValue" label="Valor da comissão em serviços" inputMode="decimal" placeholder="Ex: 10% ou R$ 20,00" />
        <SelectInput name="partCommissionType" label="Comissão em produtos/peças" defaultValue="Sem comissão">
          {employeeCommissionTypes.map((type) => <option key={type}>{type}</option>)}
        </SelectInput>
        <TextInput name="partCommissionValue" label="Valor da comissão em produtos/peças" inputMode="decimal" placeholder="Ex: 5% ou R$ 8,00" />
        <SelectInput name="washCommissionType" label="Comissão em lavagens" defaultValue="Sem comissão">
          {employeeCommissionTypes.map((type) => <option key={type}>{type}</option>)}
        </SelectInput>
        <TextInput name="washCommissionValue" label="Valor da comissão em lavagens" inputMode="decimal" placeholder="Ex: 12% ou R$ 10,00" />
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        {saved ? <span className="text-sm font-bold text-emerald-700">Funcionário salvo!</span> : null}
        <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar funcionário</button>
      </div>
    </form>
  );
}
