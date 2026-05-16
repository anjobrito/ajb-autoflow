"use client";

import { useEffect, useState } from "react";
import { demoVehicles } from "@/lib/demo-data";
import { listVehicles, StoredVehicle } from "@/lib/browser-store";

export function VehiclesClient() {
  const [vehicles, setVehicles] = useState<StoredVehicle[]>([]);

  useEffect(() => {
    setVehicles(listVehicles());
  }, []);

  const rows = [
    ...vehicles.map((vehicle) => [
      vehicle.plate,
      `${vehicle.brand} ${vehicle.model}`.trim(),
      vehicle.customer,
      `${vehicle.mileage} km`,
      "Novo cadastro",
    ]),
    ...demoVehicles.map((vehicle) => [vehicle.plate, vehicle.model, vehicle.customer, vehicle.mileage, vehicle.status]),
  ];

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {['Placa', 'Veículo', 'Cliente', 'Km atual', 'Situação'].map((column) => (
                <th key={column} className="px-5 py-4 font-black">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`} className="hover:bg-slate-50">
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`} className="px-5 py-4 text-slate-700">
                    {cellIndex === 0 ? <span className="font-black text-slate-950">{cell}</span> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
