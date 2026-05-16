"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { demoCustomers } from "@/lib/demo-data";
import { listCustomers, saveVehicle, StoredCustomer } from "@/lib/browser-store";
import { vehicleBrands } from "@/lib/select-options";

export function NewVehicleForm() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [customers, setCustomers] = useState<StoredCustomer[]>([]);
  const [plate, setPlate] = useState("");

  useEffect(() => {
    setCustomers(listCustomers());
  }, []);

  const customerOptions = [...customers.map((customer) => customer.name), ...demoCustomers.map((customer) => customer.name)];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    saveVehicle({
      customer: String(formData.get("customer") ?? ""),
      plate: String(formData.get("plate") ?? "").toUpperCase().replace(/[^A-Z0-9]/g, ""),
      brand: String(formData.get("brand") ?? ""),
      model: String(formData.get("model") ?? ""),
      year: String(formData.get("year") ?? ""),
      mileage: String(formData.get("mileage") ?? ""),
    });

    setSaved(true);
    setTimeout(() => router.push("/veiculos"), 700);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-950">Dados do veículo</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Vincule o veículo ao cliente para histórico, OS e lembretes.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">Cliente<select required name="customer" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{customerOptions.map((customer) => <option key={customer}>{customer}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Placa<input required name="plate" value={plate} onChange={(event) => setPlate(event.target.value.toUpperCase())} autoCapitalize="characters" autoComplete="off" placeholder="Ex: ABC1D23" className="uppercase rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Marca<select name="brand" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{vehicleBrands.map((brand) => <option key={brand}>{brand}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Modelo<input required name="model" placeholder="Ex: Civic" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Ano<input name="year" inputMode="numeric" placeholder="Ex: 2020" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Quilometragem<input name="mileage" inputMode="numeric" placeholder="Ex: 82450" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        {saved ? <span className="text-sm font-bold text-emerald-700">Veículo salvo!</span> : null}
        <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar veículo</button>
      </div>
    </form>
  );
}
