"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { calculateCommissionAmount, findCommissionById, numberToCurrency, StoredCommission, updateCommission } from "@/lib/browser-store";
import { commissionStatuses, commissionTargetTypes, commissionValueTypes } from "@/lib/select-options";

function Input({ name, label, placeholder, inputMode, required = true, value, onChange, type = "text" }: { name: string; label: string; placeholder: string; inputMode?: "numeric" | "decimal"; required?: boolean; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input name={name} required={required} inputMode={inputMode} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" />
    </label>
  );
}

function Select({ name, label, children, value, onChange }: { name: string; label: string; children: React.ReactNode; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <select name={name} value={value} onChange={(event) => onChange(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">
        {children}
      </select>
    </label>
  );
}

export function CommissionEditForm({ id }: { id: string }) {
  const router = useRouter();
  const [commission, setCommission] = useState<StoredCommission | null>(null);
  const [targetType, setTargetType] = useState("Serviço");
  const [targetName, setTargetName] = useState("");
  const [baseAmount, setBaseAmount] = useState("");
  const [valueType, setValueType] = useState("Percentual");
  const [value, setValue] = useState("");
  const [referenceDate, setReferenceDate] = useState("");
  const [status, setStatus] = useState("Pendente");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = findCommissionById(id) ?? null;
    setCommission(stored);
    if (stored) {
      setTargetType(stored.targetType || "Serviço");
      setTargetName(stored.targetName || "");
      setBaseAmount(stored.baseAmount || "");
      setValueType(stored.valueType || "Percentual");
      setValue(stored.value || "");
      setReferenceDate(stored.referenceDate || "");
      setStatus(stored.status || "Pendente");
      setNotes(stored.notes || "");
    }
  }, [id]);

  const calculatedAmount = useMemo(() => calculateCommissionAmount(baseAmount, valueType, value), [baseAmount, valueType, value]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateCommission(id, {
      targetType,
      targetName,
      baseAmount,
      valueType,
      value,
      calculatedAmount: numberToCurrency(calculatedAmount),
      referenceDate,
      status,
      notes,
    });
    setSaved(true);
    setTimeout(() => router.push(`/comissoes/${id}`), 700);
  }

  if (!commission) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <p className="text-xl font-black text-slate-950">Comissão não encontrada</p>
        <p className="mt-2 text-sm text-slate-600">Não foi possível editar este lançamento no localStorage atual.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 rounded-3xl border border-blue-200 bg-blue-50 p-5 text-sm font-semibold text-blue-900">
        Alterações no valor, status ou data de referência atualizam também a conta a pagar vinculada à comissão.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 md:col-span-2">
          <p className="text-sm font-bold text-slate-500">Funcionário</p>
          <p className="mt-2 text-xl font-black text-slate-950">{commission.employeeName}</p>
          <p className="mt-1 text-sm font-semibold text-slate-500">Origem: {commission.sourceWorkOrderCode || "Lançamento manual"}</p>
        </div>

        <Select name="targetType" label="Base da comissão" value={targetType} onChange={setTargetType}>
          {commissionTargetTypes.map((type) => <option key={type}>{type}</option>)}
        </Select>
        <Input name="targetName" label="Serviço, produto/peça ou lavagem" placeholder="Ex: Troca de óleo" value={targetName} onChange={setTargetName} />
        <Input name="baseAmount" label="Valor base" placeholder="Ex: R$ 150,00" inputMode="decimal" value={baseAmount} onChange={setBaseAmount} />
        <Select name="valueType" label="Tipo de comissão" value={valueType} onChange={setValueType}>
          {commissionValueTypes.map((type) => <option key={type}>{type}</option>)}
        </Select>
        <Input name="value" label="Valor da comissão" placeholder="Ex: 10% ou R$ 15,00" inputMode="decimal" value={value} onChange={setValue} />
        <Input name="referenceDate" label="Data de referência" placeholder="" type="date" required={false} value={referenceDate} onChange={setReferenceDate} />
        <Select name="status" label="Status" value={status} onChange={setStatus}>
          {commissionStatuses.map((item) => <option key={item}>{item}</option>)}
        </Select>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-bold text-slate-500">Comissão recalculada</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{numberToCurrency(calculatedAmount)}</p>
        </div>
        <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
          Observações
          <textarea name="notes" rows={4} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Regras internas, exceções ou observações da comissão" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" />
        </label>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        {saved ? <span className="text-sm font-bold text-emerald-700">Comissão atualizada!</span> : null}
        <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar alterações</button>
      </div>
    </form>
  );
}
