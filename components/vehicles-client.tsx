"use client";

import { useEffect, useState } from "react";
import { demoVehicles } from "@/lib/demo-data";
import { listVehicles, StoredVehicle } from "@/lib/browser-store";

type VehicleRow = {
  plate: string;
  vehicle: string;
  customer: string;
  mileage: string;
  powertrain: string;
  status: string;
};

export function VehiclesClient() {
  const [vehicles, setVehicles] = useState<StoredVehicle[]>([]);

  useEffect(() => {
    setVehicles(listVehicles());
  }, []);

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
  );
}
