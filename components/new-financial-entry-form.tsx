"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { saveFinancialEntry, StoredFinancialEntry } from "@/lib/browser-store";
import { financialEntryCategories, financialEntryStatuses, financialEntryTypes, paymentMethods } from "@/lib/select-options";

export function NewFinancialEntryForm() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    saveFinancialEntry({
      type: String(formData.get("type") ?? "Pagar") as StoredFinancialEntry["type"],
      description: String(formData.get("description") ?? ""),
      category: String(formData.get("category") ?? "Outro"),
      amount: String(formData.get("amount") ?? ""),
      dueDate: String(formData.get("dueDate") ?? ""),
      status: String(formData.get("status") ?? "Pendente") as StoredFinancialEntry["status"],
      paymentMethod: String(formData.get("paymentMethod") ?? "Pix"),
      notes: String(formData.get("notes") ?? ""),
    });

    setSaved(true);
    setTimeout(() => router.push("/financeiro/contas"), 700);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-950">Dados do lançamento</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Use este cadastro para registrar obrigações, recebimentos e vencimentos operacionais.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">Tipo<select required name="type" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{financialEntryTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Categoria<select required name="category" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{financialEntryCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">Descrição<input required name="description" placeholder="Ex: Compra de filtros para estoque" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Valor<input required name="amount" inputMode="decimal" placeholder="Ex: R$ 350,00" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Vencimento<input required name="dueDate" type="date" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Status<select required name="status" defaultValue="Pendente" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{financialEntryStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Forma de pagamento<select required name="paymentMethod" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{paymentMethods.map((method) => <option key={method}>{method}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">Observações<textarea name="notes" rows={4} placeholder="Detalhes internos do lançamento" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        {saved ? <span className="text-sm font-bold text-emerald-700">Lançamento salvo!</span> : null}
        <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar lançamento</button>
      </div>
    </form>
  );
}
