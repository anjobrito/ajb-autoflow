"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { UiModal } from "@/components/ui-modal";
import { demoCustomers, demoVehicles } from "@/lib/demo-data";
import { listCustomers, listVehicles, saveVehicle, StoredCustomer, StoredVehicle } from "@/lib/browser-store";
import { vehicleBrands, vehiclePowertrains } from "@/lib/select-options";

type VehicleRow = {
  plate: string;
  vehicle: string;
  customer: string;
  mileage: string;
  powertrain: string;
  status: string;
};

const inputClass = "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white";
const labelClass = "grid gap-2 text-sm font-bold text-slate-700";

export function VehiclesClient() {
  const [vehicles, setVehicles] = useState<StoredVehicle[]>([]);
  const [customers, setCustomers] = useState<StoredCustomer[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [plate, setPlate] = useState("");

  function refresh() {
    setVehicles(listVehicles());
    setCustomers(listCustomers());
  }

  useEffect(() => {
    refresh();
  }, []);

  const customerOptions = [...customers.map((customer) => customer.name), ...demoCustomers.map((customer) => customer.name)];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    saveVehicle({
      customer: String(formData.get("customer") ?? ""),
      plate: String(formData.get("plate") ?? "").toUpperCase().replace(/[^A-Z0-9]/g, ""),
      brand: String(formData.get("brand") ?? ""),
      model: String(formData.get("model") ?? ""),
      year: String(formData.get("year") ?? ""),
      mileage: String(formData.get("mileage") ?? ""),
      powertrain: String(formData.get("powertrain") ?? "Flex"),
    });

    form.reset();
    setPlate("");
    refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
    setIsFormOpen(false);
  }

  const rows: VehicleRow[] = [
    ...vehicles.map((vehicle) => ({
      plate: vehicle.plate,
      vehicle: `${vehicle.brand} ${vehicle.model}`.trim(),
      customer: vehicle.customer,
      mileage: `${vehicle.mileage || "0"} km`,
      powertrain: vehicle.powertrain || "Não informado",
      status: "Novo cadastro",
    })),
    ...demoVehicles.map((vehicle) => ({
      plate: vehicle.plate,
      vehicle: vehicle.model,
      customer: vehicle.customer,
      mileage: vehicle.mileage,
      powertrain: "Não informado",
      status: vehicle.status,
    })),
  ];

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-blue-700">Cadastro</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">Veículos cadastrados</h2>
          <p className="mt-2 text-sm text-slate-600">Cadastre veículos em modal e mantenha a listagem principal limpa.</p>
        </div>
        <button type="button" onClick={() => setIsFormOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Novo veículo
        </button>
      </div>

      {saved ? <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">Veículo salvo!</div> : null}

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {['Placa', 'Veículo', 'Cliente', 'Km atual', 'Propulsão', 'Situação'].map((column) => (
                  <th key={column} className="px-5 py-4 font-black">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row, rowIndex) => (
                <tr key={`${row.plate}-${rowIndex}`} className="hover:bg-slate-50">
                  <td className="px-5 py-4 text-slate-700"><span className="font-black text-slate-950">{row.plate}</span></td>
                  <td className="px-5 py-4 text-slate-700">{row.vehicle}</td>
                  <td className="px-5 py-4 text-slate-700">{row.customer}</td>
                  <td className="px-5 py-4 text-slate-700">{row.mileage}</td>
                  <td className="px-5 py-4 text-slate-700">{row.powertrain}</td>
                  <td className="px-5 py-4 text-slate-700">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UiModal open={isFormOpen} title="Cadastrar veículo" description="Vincule o veículo ao cliente para histórico, atendimentos, pátio e lembretes." onClose={() => setIsFormOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>Cliente<select required name="customer" className={inputClass}>{customerOptions.map((customer) => <option key={customer}>{customer}</option>)}</select></label>
            <label className={labelClass}>Placa<input required name="plate" value={plate} onChange={(event) => setPlate(event.target.value.toUpperCase())} autoCapitalize="characters" autoComplete="off" placeholder="Ex: ABC1D23" className={`${inputClass} uppercase`} /></label>
            <label className={labelClass}>Marca<select name="brand" className={inputClass}>{vehicleBrands.map((brand) => <option key={brand}>{brand}</option>)}</select></label>
            <label className={labelClass}>Tipo de propulsão<select name="powertrain" className={inputClass}>{vehiclePowertrains.map((powertrain) => <option key={powertrain}>{powertrain}</option>)}</select></label>
            <label className={labelClass}>Modelo<input required name="model" placeholder="Ex: Civic, Dolphin, Model 3" className={inputClass} /></label>
            <label className={labelClass}>Ano<input name="year" inputMode="numeric" placeholder="Ex: 2024" className={inputClass} /></label>
            <label className={labelClass}>Quilometragem<input name="mileage" inputMode="numeric" placeholder="Ex: 82450" className={inputClass} /></label>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setIsFormOpen(false)} className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">Cancelar</button>
            <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar veículo</button>
          </div>
        </form>
      </UiModal>
    </div>
  );
}
