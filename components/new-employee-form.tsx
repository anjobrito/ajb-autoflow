"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { saveEmployee } from "@/lib/browser-store";
import { employeeEmploymentTypes, employeeRoles, employeeStatuses } from "@/lib/select-options";

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
    });

    setSaved(true);
    setTimeout(() => router.push("/funcionarios"), 700);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-950">Dados do funcionário</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Essas informações preparam a base operacional para equipe, vínculos e futuras regras de comissão.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">Nome completo<input required name="name" placeholder="Ex: Carlos Almeida" autoComplete="name" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">CPF<input name="cpf" inputMode="numeric" placeholder="Ex: 123.456.789-00" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Telefone / WhatsApp<input required name="phone" inputMode="tel" autoComplete="tel" placeholder="Ex: (19) 98888-1100" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">E-mail<input name="email" type="email" autoComplete="email" placeholder="Ex: funcionario@email.com" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Cargo/função<select required name="role" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{employeeRoles.map((role) => <option key={role}>{role}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Tipo de vínculo<select required name="employmentType" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{employeeEmploymentTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Status<select required name="status" defaultValue="Ativo" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{employeeStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        {saved ? <span className="text-sm font-bold text-emerald-700">Funcionário salvo!</span> : null}
        <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar funcionário</button>
      </div>
    </form>
  );
}
