"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { demoCustomers, demoProducts, demoServices, demoVehicles } from "@/lib/demo-data";
import { listCustomers, listVehicles, saveWorkOrder, StoredCustomer, StoredVehicle } from "@/lib/browser-store";

export function NewWorkOrderForm() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [customers, setCustomers] = useState<StoredCustomer[]>([]);
  const [vehicles, setVehicles] = useState<StoredVehicle[]>([]);

  useEffect(() => {
    setCustomers(listCustomers());
    setVehicles(listVehicles());
  }, []);

  const customerOptions = [...customers.map((customer) => customer.name), ...demoCustomers.map((customer) => customer.name)];
  const vehicleOptions = [
    ...vehicles.map((vehicle) => `${vehicle.plate} - ${vehicle.brand} ${vehicle.model}`.trim()),
    ...demoVehicles.map((vehicle) => `${vehicle.plate} - ${vehicle.model}`),
  ];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const record = saveWorkOrder({
      customer: String(formData.get("customer") ?? ""),
      vehicle: String(formData.get("vehicle") ?? ""),
      service: String(formData.get("service") ?? ""),
      product: String(formData.get("product") ?? ""),
      status: String(formData.get("status") ?? ""),
      total: String(formData.get("total") ?? ""),
      notes: String(formData.get("notes") ?? ""),
    });

    setSaved(true);
    setTimeout(() => router.push(`/ordens-servico/${record.id}`), 700);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-black text-slate-950">Dados da OS</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Abra a ordem de serviço e acompanhe até o aviso de retirada.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-700">Cliente<select required name="customer" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{customerOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Veículo<select required name="vehicle" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{vehicleOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Serviço principal<select required name="service" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{demoServices.map((service) => <option key={service.id}>{service.name}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Produto / peça<select name="product" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{demoProducts.map((product) => <option key={product.id}>{product.name}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Status<select required name="status" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{["Aberta", "Em andamento", "Aguardando peça", "Pronta para retirada"].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Valor estimado<input required name="total" placeholder="Ex: R$ 238,00" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
        </div>

        <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">
          Observações
          <textarea name="notes" className="min-h-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" placeholder="Descreva o problema, serviço solicitado ou orientação ao mecânico." />
        </label>

        <div className="mt-6 flex items-center justify-end gap-3">
          {saved ? <span className="text-sm font-bold text-emerald-700">OS criada!</span> : null}
          <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Criar ordem de serviço</button>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm font-bold text-blue-300">Fluxo comercial</p>
        <h2 className="mt-2 text-2xl font-black">Cliente → Veículo → OS → Aviso</h2>
        <p className="mt-4 text-sm leading-6 text-slate-300">Esse fluxo já grava a OS no navegador e abre a página de detalhe depois de salvar.</p>
        <div className="mt-6 grid gap-3 text-sm text-slate-200">
          <div className="rounded-2xl bg-white/10 p-4">1. Selecione cliente e veículo</div>
          <div className="rounded-2xl bg-white/10 p-4">2. Informe serviço, peça e total</div>
          <div className="rounded-2xl bg-white/10 p-4">3. Salve a OS</div>
          <div className="rounded-2xl bg-white/10 p-4">4. Avise o cliente no detalhe</div>
        </div>
      </div>
    </form>
  );
}
