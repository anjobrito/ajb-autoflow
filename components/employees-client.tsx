"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { UiModal } from "@/components/ui-modal";
import { listEmployees, saveEmployee, StoredEmployee } from "@/lib/browser-store";
import { employeeCommissionTypes, employeeEmploymentTypes, employeeRoles, employeeStatuses } from "@/lib/select-options";

const inputClass = "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white";
const labelClass = "grid gap-2 text-sm font-bold text-slate-700";

function formatCommission(type?: string, value?: string) {
  if (!type || type === "Sem comissão") return "Sem comissão";
  return value ? `${type} • ${value}` : type;
}

export function EmployeesClient() {
  const [employees, setEmployees] = useState<StoredEmployee[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  function refresh() {
    setEmployees(listEmployees());
  }

  useEffect(() => {
    refresh();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

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
          <h2 className="mt-1 text-2xl font-black text-slate-950">Funcionários cadastrados</h2>
          <p className="mt-2 text-sm text-slate-600">Cadastre funcionários em modal e mantenha a tela principal focada na equipe.</p>
        </div>
        <button type="button" onClick={() => setIsFormOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Novo funcionário
        </button>
      </div>

      {saved ? <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">Funcionário salvo!</div> : null}

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {["Funcionário", "Telefone", "Cargo/função", "Vínculo", "Comissão serviço", "Comissão peça", "Comissão lavagem", "Status"].map((column) => (
                  <th key={column} className="px-5 py-4 font-black">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-sm font-semibold text-slate-500">
                    Nenhum funcionário cadastrado ainda. Cadastre a equipe para organizar atendimento, operação e futuras comissões.
                  </td>
                </tr>
              ) : employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <span className="font-black text-slate-950">{employee.name}</span>
                    <p className="mt-1 text-xs font-semibold text-slate-500">CPF: {employee.cpf || "Não informado"}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">E-mail: {employee.email || "Não informado"}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-700">{employee.phone}</td>
                  <td className="px-5 py-4 text-slate-700">{employee.role}</td>
                  <td className="px-5 py-4 text-slate-700">{employee.employmentType}</td>
                  <td className="px-5 py-4 text-slate-700">{formatCommission(employee.serviceCommissionType, employee.serviceCommissionValue)}</td>
                  <td className="px-5 py-4 text-slate-700">{formatCommission(employee.partCommissionType, employee.partCommissionValue)}</td>
                  <td className="px-5 py-4 text-slate-700">{formatCommission(employee.washCommissionType, employee.washCommissionValue)}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{employee.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UiModal open={isFormOpen} title="Cadastrar funcionário" description="Registre equipe, vínculo e regras de comissão sem poluir a tela principal." onClose={() => setIsFormOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>Nome completo<input required name="name" placeholder="Ex: Carlos Almeida" autoComplete="name" className={inputClass} /></label>
            <label className={labelClass}>CPF<input name="cpf" inputMode="numeric" placeholder="Ex: 123.456.789-00" className={inputClass} /></label>
            <label className={labelClass}>Telefone / WhatsApp<input required name="phone" inputMode="tel" autoComplete="tel" placeholder="Ex: (19) 98888-1100" className={inputClass} /></label>
            <label className={labelClass}>E-mail<input name="email" type="email" inputMode="email" autoComplete="email" placeholder="Ex: funcionario@email.com" className={inputClass} /></label>
            <label className={labelClass}>Cargo/função<select required name="role" className={inputClass}>{employeeRoles.map((role) => <option key={role}>{role}</option>)}</select></label>
            <label className={labelClass}>Tipo de vínculo<select required name="employmentType" className={inputClass}>{employeeEmploymentTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
            <label className={labelClass}>Status<select required name="status" defaultValue="Ativo" className={inputClass}>{employeeStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
          </div>

          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-5">
            <h3 className="text-lg font-black text-blue-950">Regras de comissão do funcionário</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-blue-900">Informe percentuais como 10% e valores fixos como R$ 15,00. Essas regras servem de referência para o lançamento manual de comissões nesta versão do MVP.</p>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className={labelClass}>Comissão em serviços<select name="serviceCommissionType" defaultValue="Sem comissão" className={inputClass}>{employeeCommissionTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
            <label className={labelClass}>Valor da comissão em serviços<input name="serviceCommissionValue" inputMode="decimal" placeholder="Ex: 10% ou R$ 20,00" className={inputClass} /></label>
            <label className={labelClass}>Comissão em produtos/peças<select name="partCommissionType" defaultValue="Sem comissão" className={inputClass}>{employeeCommissionTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
            <label className={labelClass}>Valor da comissão em produtos/peças<input name="partCommissionValue" inputMode="decimal" placeholder="Ex: 5% ou R$ 8,00" className={inputClass} /></label>
            <label className={labelClass}>Comissão em lavagens<select name="washCommissionType" defaultValue="Sem comissão" className={inputClass}>{employeeCommissionTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
            <label className={labelClass}>Valor da comissão em lavagens<input name="washCommissionValue" inputMode="decimal" placeholder="Ex: 12% ou R$ 10,00" className={inputClass} /></label>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setIsFormOpen(false)} className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">Cancelar</button>
            <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar funcionário</button>
          </div>
        </form>
      </UiModal>
    </div>
  );
}
