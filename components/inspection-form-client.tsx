"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { findInspectionByWorkOrderId, findWorkOrderById, saveInspection, StoredInspection, StoredWorkOrder } from "@/lib/browser-store";
import { fuelLevels, inspectionDamageAreas } from "@/lib/select-options";

export function InspectionFormClient({ workOrderId }: { workOrderId: string }) {
  const router = useRouter();
  const [order, setOrder] = useState<StoredWorkOrder | null>(null);
  const [inspection, setInspection] = useState<StoredInspection | null>(null);
  const [saved, setSaved] = useState(false);
  const [damages, setDamages] = useState<string[]>([]);

  useEffect(() => {
    setOrder(findWorkOrderById(workOrderId) ?? null);
    const existing = findInspectionByWorkOrderId(workOrderId) ?? null;
    setInspection(existing);
    setDamages(existing?.damages ?? []);
  }, [workOrderId]);

  function toggleDamage(value: string) {
    setDamages((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    saveInspection({
      workOrderId,
      plate: String(formData.get("plate") ?? ""),
      mileage: String(formData.get("mileage") ?? ""),
      fuelLevel: String(formData.get("fuelLevel") ?? ""),
      hasDocuments: formData.get("hasDocuments") === "on",
      hasSpareTire: formData.get("hasSpareTire") === "on",
      hasJack: formData.get("hasJack") === "on",
      hasPersonalItems: formData.get("hasPersonalItems") === "on",
      personalItems: String(formData.get("personalItems") ?? ""),
      damages,
      notes: String(formData.get("notes") ?? ""),
    });

    setSaved(true);
    setTimeout(() => router.push(`/ordens-servico/${workOrderId}`), 800);
  }

  const plate = order?.vehicle.split(" - ")[0] ?? inspection?.plate ?? "";

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-950">Checklist de entrada</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Registre as condições do veículo antes do serviço para reduzir conflitos e proteger a empresa.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-bold text-slate-700">Placa<input name="plate" defaultValue={plate} className="uppercase rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">KM<input name="mileage" inputMode="numeric" defaultValue={inspection?.mileage ?? ""} placeholder="Ex: 82450" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Combustível<select name="fuelLevel" defaultValue={inspection?.fuelLevel ?? "1/2"} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{fuelLevels.map((level) => <option key={level}>{level}</option>)}</select></label>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[['hasDocuments', 'Documentos'], ['hasSpareTire', 'Estepe'], ['hasJack', 'Macaco'], ['hasPersonalItems', 'Objetos pessoais']].map(([name, label]) => (
            <label key={name} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700">
              <input name={name} type="checkbox" defaultChecked={Boolean(inspection?.[name as keyof StoredInspection])} className="h-5 w-5" />
              {label}
            </label>
          ))}
        </div>

        <label className="mt-6 grid gap-2 text-sm font-bold text-slate-700">Objetos deixados no veículo<textarea name="personalItems" defaultValue={inspection?.personalItems ?? ""} placeholder="Ex: óculos, carregador, mochila..." className="min-h-24 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>

        <div className="mt-6">
          <p className="text-sm font-black text-slate-700">Avarias visuais</p>
          <p className="mt-1 text-sm text-slate-500">Toque nas áreas com risco, amassado ou observação.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {inspectionDamageAreas.map((item) => {
              const active = damages.includes(item);
              return (
                <button key={item} type="button" onClick={() => toggleDamage(item)} className={`rounded-2xl border p-4 text-left text-sm font-black transition ${active ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"}`}>
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <label className="mt-6 grid gap-2 text-sm font-bold text-slate-700">Observações gerais<textarea name="notes" defaultValue={inspection?.notes ?? ""} placeholder="Descreva detalhes importantes da vistoria." className="min-h-28 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>

        <div className="mt-6 flex items-center justify-end gap-3">
          {saved ? <span className="text-sm font-bold text-emerald-700">Vistoria salva!</span> : null}
          <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar vistoria</button>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm font-bold text-blue-300">Proteção operacional</p>
        <h2 className="mt-2 text-2xl font-black">Menos conflito na entrega.</h2>
        <p className="mt-4 text-sm leading-6 text-slate-300">O checklist registra estado do veículo, itens presentes e avarias antes do serviço. No futuro, esta tela poderá receber fotos por câmera e assinatura do cliente.</p>
        <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm text-slate-200">OS: {order?.code ?? workOrderId}</div>
      </div>
    </form>
  );
}
