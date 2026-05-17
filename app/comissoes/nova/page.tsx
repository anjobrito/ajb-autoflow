"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { calculateCommissionAmount, listEmployees, listProducts, listServices, numberToCurrency, saveCommission, StoredEmployee, StoredProduct, StoredService } from "@/lib/browser-store";
import { commissionStatuses, commissionTargetTypes, commissionValueTypes } from "@/lib/select-options";

function Input({ name, label, placeholder, inputMode, required = true, onChange, value, type = "text" }: { name: string; label: string; placeholder: string; inputMode?: "numeric" | "decimal"; required?: boolean; onChange?: (value: string) => void; value?: string; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input name={name} required={required} inputMode={inputMode} type={type} value={value} onChange={onChange ? (event) => onChange(event.target.value) : undefined} placeholder={placeholder} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" />
    </label>
  );
}

function Select({ name, label, children, value, onChange }: { name: string; label: string; children: React.ReactNode; value?: string; onChange?: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <select name={name} value={value} onChange={onChange ? (event) => onChange(event.target.value) : undefined} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">
        {children}
      </select>
    </label>
  );
}

function getEmployeeRule(employee: StoredEmployee | undefined, targetType: string) {
  if (!employee) return { valueType: "Percentual", value: "" };
  if (targetType === "Serviço" && employee.serviceCommissionType && employee.serviceCommissionType !== "Sem comissão") return { valueType: employee.serviceCommissionType, value: employee.serviceCommissionValue ?? "" };
  if (targetType === "Produto/peça" && employee.partCommissionType && employee.partCommissionType !== "Sem comissão") return { valueType: employee.partCommissionType, value: employee.partCommissionValue ?? "" };
  if (targetType === "Lavagem" && employee.washCommissionType && employee.washCommissionType !== "Sem comissão") return { valueType: employee.washCommissionType, value: employee.washCommissionValue ?? "" };
  return { valueType: "Percentual", value: "" };
}

export default function NovaComissaoPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [employees, setEmployees] = useState<StoredEmployee[]>([]);
  const [services, setServices] = useState<StoredService[]>([]);
  const [products, setProducts] = useState<StoredProduct[]>([]);
  const [employeeId, setEmployeeId] = useState("");
  const [targetType, setTargetType] = useState("Serviço");
  const [valueType, setValueType] = useState("Percentual");
  const [value, setValue] = useState("");
  const [baseAmount, setBaseAmount] = useState("");

  useEffect(() => {
    const storedEmployees = listEmployees();
    setEmployees(storedEmployees);
    setServices(listServices());
    setProducts(listProducts());
    if (storedEmployees[0]) setEmployeeId(storedEmployees[0].id);
  }, []);

  const selectedEmployee = useMemo(() => employees.find((item) => item.id === employeeId), [employeeId, employees]);

  useEffect(() => {
    const rule = getEmployeeRule(selectedEmployee, targetType);
    setValueType(rule.valueType);
    setValue(rule.value);
  }, [selectedEmployee, targetType]);

  const calculatedAmount = useMemo(() => calculateCommissionAmount(baseAmount, valueType, value), [baseAmount, valueType, value]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const employee = employees.find((item) => item.id === employeeId);

    saveCommission({
      employeeId: employee?.id,
      employeeName: employee?.name ?? "Funcionário a definir",
      targetType,
      targetName: String(formData.get("targetName") ?? ""),
      valueType,
      value,
      baseAmount,
      calculatedAmount: numberToCurrency(calculatedAmount),
      status: String(formData.get("status") ?? "Pendente"),
      referenceDate: String(formData.get("referenceDate") ?? new Date().toISOString().slice(0, 10)),
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
      <PageHeader eyebrow="Nova comissão" title="Cadastrar comissão" description="Lance uma comissão manual com cálculo estimado por funcionário, serviço, produto/peça ou lavagem." />
      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6 rounded-3xl border border-blue-200 bg-blue-50 p-5 text-sm font-semibold text-blue-900">
          Quando o funcionário possuir regra cadastrada para a base escolhida, o tipo e o valor da comissão serão sugeridos automaticamente. O lançamento continua manual para preservar a segurança do MVP.
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Select name="employeeId" label="Funcionário" value={employeeId} onChange={setEmployeeId}>
            {employees.length > 0 ? employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name} - {employee.role}</option>) : <option value="">Funcionário a definir</option>}
          </Select>
          <Select name="targetType" label="Base da comissão" value={targetType} onChange={setTargetType}>
            {commissionTargetTypes.map((type) => <option key={type}>{type}</option>)}
          </Select>
          <Select name="targetName" label="Serviço, produto/peça ou lavagem">
            {uniqueTargetOptions.length > 0 ? uniqueTargetOptions.map((target) => <option key={target}>{target}</option>) : <option>Outro</option>}
          </Select>
          <Input name="baseAmount" label="Valor base" placeholder="Ex: R$ 150,00" inputMode="decimal" value={baseAmount} onChange={setBaseAmount} />
          <Select name="valueType" label="Tipo de comissão" value={valueType} onChange={setValueType}>
            {commissionValueTypes.map((type) => <option key={type}>{type}</option>)}
          </Select>
          <Input name="value" label="Valor da comissão" placeholder="Ex: 10% ou R$ 15,00" inputMode="decimal" value={value} onChange={setValue} />
          <Input name="referenceDate" label="Data de referência" placeholder="" type="date" required={false} />
          <Select name="status" label="Status">
            {commissionStatuses.map((status) => <option key={status}>{status}</option>)}
          </Select>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 md:col-span-2">
            <p className="text-sm font-bold text-slate-500">Comissão calculada</p>
            <p className="mt-2 text-3xl font-black text-slate-950">{numberToCurrency(calculatedAmount)}</p>
          </div>
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
