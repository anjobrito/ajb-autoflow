"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { UiModal } from "@/components/ui-modal";
import {
  calculateCommissionAmount,
  currencyToNumber,
  deleteCommission,
  listCommissions,
  listEmployees,
  listProducts,
  listServices,
  numberToCurrency,
  saveCommission,
  StoredCommission,
  StoredEmployee,
  StoredProduct,
  StoredService,
  updateCommission,
  updateCommissionStatus,
} from "@/lib/browser-store";
import { commissionStatuses, commissionTargetTypes, commissionValueTypes } from "@/lib/select-options";

function StatusBadge({ status }: { status: string }) {
  const className = status === "Paga"
    ? "bg-emerald-100 text-emerald-700"
    : status === "Cancelada"
      ? "bg-rose-100 text-rose-700"
      : "bg-amber-100 text-amber-700";

  return <span className={`rounded-full px-3 py-1 text-xs font-black ${className}`}>{status}</span>;
}

const inputClass = "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white";
const labelClass = "grid gap-2 text-sm font-bold text-slate-700";

type CommissionFormState = {
  employeeId: string;
  targetType: string;
  targetName: string;
  valueType: string;
  value: string;
  baseAmount: string;
  status: string;
  referenceDate: string;
  notes: string;
};

const emptyForm: CommissionFormState = {
  employeeId: "",
  targetType: "Serviço",
  targetName: "",
  valueType: "Percentual",
  value: "",
  baseAmount: "",
  status: "Pendente",
  referenceDate: "",
  notes: "",
};

function getEmployeeRule(employee: StoredEmployee | undefined, targetType: string) {
  if (!employee) return { valueType: "Percentual", value: "" };
  if (targetType === "Serviço" && employee.serviceCommissionType && employee.serviceCommissionType !== "Sem comissão") return { valueType: employee.serviceCommissionType, value: employee.serviceCommissionValue ?? "" };
  if (targetType === "Produto/peça" && employee.partCommissionType && employee.partCommissionType !== "Sem comissão") return { valueType: employee.partCommissionType, value: employee.partCommissionValue ?? "" };
  if (targetType === "Lavagem" && employee.washCommissionType && employee.washCommissionType !== "Sem comissão") return { valueType: employee.washCommissionType, value: employee.washCommissionValue ?? "" };
  return { valueType: "Percentual", value: "" };
}

export function CommissionsClient() {
  const [commissions, setCommissions] = useState<StoredCommission[]>([]);
  const [employees, setEmployees] = useState<StoredEmployee[]>([]);
  const [services, setServices] = useState<StoredService[]>([]);
  const [products, setProducts] = useState<StoredProduct[]>([]);
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [targetFilter, setTargetFilter] = useState("Todas");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CommissionFormState>(emptyForm);

  function reloadCommissions() {
    setCommissions(listCommissions());
  }

  function reloadCatalogs() {
    setEmployees(listEmployees());
    setServices(listServices());
    setProducts(listProducts());
  }

  useEffect(() => {
    reloadCommissions();
    reloadCatalogs();
  }, []);

  function updateForm<K extends keyof CommissionFormState>(field: K, value: CommissionFormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  const selectedEmployee = useMemo(() => employees.find((item) => item.id === form.employeeId), [employees, form.employeeId]);

  function handleEmployeeChange(employeeId: string) {
    const employee = employees.find((item) => item.id === employeeId);
    const rule = getEmployeeRule(employee, form.targetType);
    setForm((current) => ({ ...current, employeeId, valueType: rule.valueType, value: rule.value }));
  }

  function handleTargetTypeChange(targetType: string) {
    const rule = getEmployeeRule(selectedEmployee, targetType);
    setForm((current) => ({ ...current, targetType, targetName: "", valueType: rule.valueType, value: rule.value }));
  }

  function resetForm() {
    setEditingId(null);
    setForm({ ...emptyForm, employeeId: employees[0]?.id ?? "", referenceDate: new Date().toISOString().slice(0, 10) });
  }

  function openNewForm() {
    reloadCatalogs();
    setEditingId(null);
    setForm({ ...emptyForm, employeeId: employees[0]?.id ?? "", referenceDate: new Date().toISOString().slice(0, 10) });
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleEdit(commission: StoredCommission) {
    reloadCatalogs();
    setEditingId(commission.id);
    setForm({
      employeeId: commission.employeeId ?? "",
      targetType: commission.targetType || "Serviço",
      targetName: commission.targetName || "",
      valueType: commission.valueType || "Percentual",
      value: commission.value || "",
      baseAmount: commission.baseAmount || "",
      status: commission.status || "Pendente",
      referenceDate: commission.referenceDate || new Date().toISOString().slice(0, 10),
      notes: commission.notes || "",
    });
    setIsFormOpen(true);
  }

  const targetOptions = useMemo(() => {
    const base = [
      ...services.map((service) => service.name),
      ...products.map((product) => product.name),
      "Lavagem simples",
      "Lavagem completa",
      "Higienização interna",
      "Outro",
      form.targetName,
    ];
    return Array.from(new Set(base.filter(Boolean)));
  }, [services, products, form.targetName]);

  const calculatedAmount = useMemo(() => calculateCommissionAmount(form.baseAmount, form.valueType, form.value), [form.baseAmount, form.valueType, form.value]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const employee = employees.find((item) => item.id === form.employeeId);
    const payload = {
      employeeId: employee?.id,
      employeeName: employee?.name ?? "Funcionário a definir",
      targetType: form.targetType,
      targetName: form.targetName || "Outro",
      valueType: form.valueType,
      value: form.value,
      baseAmount: form.baseAmount,
      calculatedAmount: numberToCurrency(calculatedAmount),
      status: form.status,
      referenceDate: form.referenceDate || new Date().toISOString().slice(0, 10),
      notes: form.notes,
    };

    if (editingId) updateCommission(editingId, payload);
    else saveCommission(payload);

    reloadCommissions();
    closeForm();
  }

  const filteredRows = useMemo(() => commissions.filter((commission) => {
    const matchesStatus = statusFilter === "Todas" || commission.status === statusFilter;
    const matchesTarget = targetFilter === "Todas" || commission.targetType === targetFilter;
    return matchesStatus && matchesTarget;
  }), [commissions, statusFilter, targetFilter]);

  const employeeSummaries = useMemo(() => {
    const summary = new Map<string, { employeeName: string; pending: number; paid: number; cancelled: number; count: number }>();
    commissions.forEach((commission) => {
      const key = commission.employeeId || commission.employeeName || "Funcionário a definir";
      const current = summary.get(key) || { employeeName: commission.employeeName || "Funcionário a definir", pending: 0, paid: 0, cancelled: 0, count: 0 };
      const amount = currencyToNumber(commission.calculatedAmount ?? "0");
      if (commission.status === "Pendente") current.pending += amount;
      if (commission.status === "Paga") current.paid += amount;
      if (commission.status === "Cancelada") current.cancelled += amount;
      current.count += 1;
      summary.set(key, current);
    });
    return Array.from(summary.values()).sort((a, b) => (b.pending + b.paid) - (a.pending + a.paid));
  }, [commissions]);

  const pendingTotal = commissions.filter((commission) => commission.status === "Pendente").reduce((sum, commission) => sum + currencyToNumber(commission.calculatedAmount ?? "0"), 0);
  const paidTotal = commissions.filter((commission) => commission.status === "Paga").reduce((sum, commission) => sum + currencyToNumber(commission.calculatedAmount ?? "0"), 0);
  const cancelledTotal = commissions.filter((commission) => commission.status === "Cancelada").reduce((sum, commission) => sum + currencyToNumber(commission.calculatedAmount ?? "0"), 0);
  const serviceCount = commissions.filter((commission) => commission.targetType === "Serviço").length;
  const productCount = commissions.filter((commission) => commission.targetType === "Produto/peça").length;
  const washCount = commissions.filter((commission) => commission.targetType === "Lavagem").length;

  function handleStatusChange(id: string, status: "Pendente" | "Paga" | "Cancelada") {
    updateCommissionStatus(id, status);
    reloadCommissions();
  }

  function handleDelete(id: string) {
    deleteCommission(id);
    reloadCommissions();
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Pendente", numberToCurrency(pendingTotal)],
          ["Pago", numberToCurrency(paidTotal)],
          ["Cancelado", numberToCurrency(cancelledTotal)],
          ["Lançamentos", commissions.length],
        ].map(([label, value]) => (
          <div key={label} className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-5 text-sm font-semibold text-blue-900 md:col-span-2">
          Controle as comissões lançadas manualmente ou sugeridas por fluxo operacional, com valor base, cálculo estimado, status de pagamento e conta a pagar vinculada no financeiro.
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Distribuição</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">Serviços: {serviceCount}</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">Produtos/peças: {productCount}</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">Lavagens: {washCount}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-blue-700">Lançamento em modal</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">Comissões cadastradas</h2>
          <p className="mt-2 text-sm text-slate-600">Cadastre e edite comissões sem sair da tela principal.</p>
        </div>
        <button type="button" onClick={openNewForm} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Nova comissão
        </button>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-xl font-black text-slate-950">Resumo por funcionário</h2>
          <p className="mt-2 text-sm text-slate-600">Visão rápida de pendências, pagamentos e cancelamentos por colaborador.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>{["Funcionário", "Pendente", "Pago", "Cancelado", "Lançamentos"].map((column) => <th key={column} className="px-5 py-4 font-black">{column}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employeeSummaries.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-sm font-semibold text-slate-500">Nenhum resumo disponível ainda.</td></tr>
              ) : employeeSummaries.map((summary) => (
                <tr key={summary.employeeName} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-black text-slate-950">{summary.employeeName}</td>
                  <td className="px-5 py-4 font-black text-amber-700">{numberToCurrency(summary.pending)}</td>
                  <td className="px-5 py-4 font-black text-emerald-700">{numberToCurrency(summary.paid)}</td>
                  <td className="px-5 py-4 font-black text-rose-700">{numberToCurrency(summary.cancelled)}</td>
                  <td className="px-5 py-4 text-slate-700">{summary.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 rounded-3xl bg-white p-5 shadow-sm md:grid-cols-2">
        <label className={labelClass}>Filtrar por status<select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className={inputClass}>{["Todas", "Pendente", "Paga", "Cancelada"].map((status) => <option key={status}>{status}</option>)}</select></label>
        <label className={labelClass}>Filtrar por base<select value={targetFilter} onChange={(event) => setTargetFilter(event.target.value)} className={inputClass}>{["Todas", ...commissionTargetTypes].map((target) => <option key={target}>{target}</option>)}</select></label>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1280px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>{["Funcionário", "Base", "Item", "Origem", "Valor base", "Regra", "Calculado", "Referência", "Status", "Ações"].map((column) => <th key={column} className="px-5 py-4 font-black">{column}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.length === 0 ? (
                <tr><td colSpan={10} className="px-5 py-8 text-center text-sm font-semibold text-slate-500">Nenhuma comissão encontrada. Cadastre uma comissão para começar o controle de pagamento variável.</td></tr>
              ) : filteredRows.map((commission) => (
                <tr key={commission.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-black text-slate-950">{commission.employeeName || "Funcionário a definir"}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.targetType}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.targetName}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.sourceWorkOrderCode || "Manual"}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.baseAmount || "-"}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.valueType} • {commission.value}</td>
                  <td className="px-5 py-4 font-black text-slate-950">{commission.calculatedAmount || "-"}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.referenceDate || "-"}</td>
                  <td className="px-5 py-4"><StatusBadge status={commission.status || "Pendente"} /></td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => handleEdit(commission)} className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-xs font-black text-blue-700 hover:bg-blue-200"><Pencil className="h-4 w-4" />Editar</button>
                      <button type="button" onClick={() => handleStatusChange(commission.id, "Paga")} className="rounded-full bg-emerald-100 px-3 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-200">Pagar</button>
                      <button type="button" onClick={() => handleStatusChange(commission.id, "Cancelada")} className="rounded-full bg-rose-100 px-3 py-2 text-xs font-black text-rose-700 hover:bg-rose-200">Cancelar</button>
                      <button type="button" onClick={() => handleDelete(commission.id)} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 hover:bg-slate-200"><Trash2 className="h-4 w-4" />Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UiModal open={isFormOpen} title={editingId ? "Editar comissão" : "Cadastrar comissão"} description="Lance uma comissão manual com cálculo estimado por funcionário, serviço, produto/peça ou lavagem." onClose={closeForm}>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 rounded-3xl border border-blue-200 bg-blue-50 p-5 text-sm font-semibold text-blue-900">
            Quando o funcionário possuir regra cadastrada para a base escolhida, o tipo e o valor da comissão serão sugeridos automaticamente. O lançamento continua manual para preservar a segurança do MVP.
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>Funcionário<select value={form.employeeId} onChange={(event) => handleEmployeeChange(event.target.value)} className={inputClass}>{employees.length > 0 ? employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name} - {employee.role}</option>) : <option value="">Funcionário a definir</option>}</select></label>
            <label className={labelClass}>Base da comissão<select value={form.targetType} onChange={(event) => handleTargetTypeChange(event.target.value)} className={inputClass}>{commissionTargetTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
            <label className={labelClass}>Serviço, produto/peça ou lavagem<select value={form.targetName} onChange={(event) => updateForm("targetName", event.target.value)} className={inputClass}><option value="">Selecionar item</option>{targetOptions.map((target) => <option key={target}>{target}</option>)}</select></label>
            <label className={labelClass}>Valor base<input value={form.baseAmount} onChange={(event) => updateForm("baseAmount", event.target.value)} placeholder="Ex: R$ 150,00" inputMode="decimal" className={inputClass} /></label>
            <label className={labelClass}>Tipo de comissão<select value={form.valueType} onChange={(event) => updateForm("valueType", event.target.value)} className={inputClass}>{commissionValueTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
            <label className={labelClass}>Valor da comissão<input value={form.value} onChange={(event) => updateForm("value", event.target.value)} placeholder="Ex: 10% ou R$ 15,00" inputMode="decimal" className={inputClass} /></label>
            <label className={labelClass}>Data de referência<input type="date" value={form.referenceDate} onChange={(event) => updateForm("referenceDate", event.target.value)} className={inputClass} /></label>
            <label className={labelClass}>Status<select value={form.status} onChange={(event) => updateForm("status", event.target.value)} className={inputClass}>{commissionStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 md:col-span-2">
              <p className="text-sm font-bold text-slate-500">Comissão calculada</p>
              <p className="mt-2 text-3xl font-black text-slate-950">{numberToCurrency(calculatedAmount)}</p>
            </div>
            <label className={`${labelClass} md:col-span-2`}>Observações<textarea value={form.notes} onChange={(event) => updateForm("notes", event.target.value)} rows={4} placeholder="Regras internas, exceções ou observações da comissão" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={closeForm} className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">Cancelar</button>
            <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">{editingId ? "Salvar alterações" : "Salvar comissão"}</button>
          </div>
        </form>
      </UiModal>
    </div>
  );
}
