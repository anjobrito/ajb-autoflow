"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Car, ClipboardList, Search, ShieldCheck, Wrench } from "lucide-react";
import { listInspections, listVehicles, listWorkOrders, StoredInspection, StoredVehicle, StoredWorkOrder } from "@/lib/browser-store";
import { demoVehicles, demoWorkOrders } from "@/lib/demo-data";

function normalizePlate(value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

function extractPlate(vehicle: string) {
  return vehicle.split(" - ")[0] ?? vehicle;
}

function formatDate(value?: string) {
  if (!value) return "Sem data";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

export function VehicleHistoryClient() {
  const [query, setQuery] = useState("");
  const [vehicles, setVehicles] = useState<StoredVehicle[]>([]);
  const [orders, setOrders] = useState<StoredWorkOrder[]>([]);
  const [inspections, setInspections] = useState<StoredInspection[]>([]);

  useEffect(() => {
    setVehicles(listVehicles());
    setOrders(listWorkOrders());
    setInspections(listInspections());
  }, []);

  const selectedPlate = normalizePlate(query);

  const vehicleMatches = useMemo(() => {
    const stored = vehicles.map((vehicle) => ({
      plate: vehicle.plate,
      model: `${vehicle.brand} ${vehicle.model}`.trim(),
      customer: vehicle.customer,
      mileage: vehicle.mileage,
      powertrain: vehicle.powertrain || "Não informado",
    }));

    const demo = demoVehicles.map((vehicle) => ({
      plate: vehicle.plate,
      model: vehicle.model,
      customer: vehicle.customer,
      mileage: vehicle.mileage,
      powertrain: "Não informado",
    }));

    const all = [...stored, ...demo];
    if (!selectedPlate) return all.slice(0, 8);
    return all.filter((vehicle) => normalizePlate(vehicle.plate).includes(selectedPlate));
  }, [selectedPlate, vehicles]);

  const history = useMemo(() => {
    const storedHistory = orders.map((order) => {
      const plate = extractPlate(order.vehicle);
      const vehicle = vehicles.find((item) => normalizePlate(item.plate) === normalizePlate(plate));

      return {
        id: order.id,
        code: order.code,
        plate,
        customer: order.customer,
        vehicle: order.vehicle,
        powertrain: vehicle?.powertrain || "Não informado",
        service: order.service,
        product: order.product,
        status: order.status,
        total: order.total,
        source: "Cadastro",
      };
    });

    const demoHistory = demoWorkOrders.map((order) => ({
      id: order.id,
      code: order.code,
      plate: order.plate,
      customer: order.customer,
      vehicle: `${order.plate} - ${order.vehicle}`,
      powertrain: "Não informado",
      service: order.service,
      product: "Produto demo",
      status: order.status,
      total: order.total,
      source: "Demo",
    }));

    const all = [...storedHistory, ...demoHistory];
    if (!selectedPlate) return [];
    return all.filter((item) => normalizePlate(item.plate).includes(selectedPlate));
  }, [orders, selectedPlate, vehicles]);

  const inspectionHistory = useMemo(() => {
    if (!selectedPlate) return [];
    return inspections.filter((inspection) => normalizePlate(inspection.plate).includes(selectedPlate));
  }, [inspections, selectedPlate]);

  const totalSpent = history.reduce((sum, item) => {
    const value = item.total.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
    return sum + (Number(value) || 0);
  }, 0);

  return (
    <div className="grid gap-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-black">Buscar por placa</h2>
            <p className="mt-2 text-sm text-slate-600">Consulte histórico de serviços, produtos usados, valores, vistoria e status do veículo.</p>
          </div>
          <label className="grid gap-2 text-sm font-bold text-slate-700 lg:w-80">
            Placa
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-500 focus-within:bg-white">
              <Search className="h-5 w-5 text-slate-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value.toUpperCase())} placeholder="Ex: ABC1D23" className="w-full bg-transparent font-black uppercase outline-none" />
            </div>
          </label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm"><Car className="h-7 w-7 text-blue-700" /><p className="mt-4 text-sm text-slate-500">Veículos encontrados</p><p className="mt-2 text-3xl font-black">{vehicleMatches.length}</p></div>
        <div className="rounded-3xl bg-white p-6 shadow-sm"><ClipboardList className="h-7 w-7 text-blue-700" /><p className="mt-4 text-sm text-slate-500">OS encontradas</p><p className="mt-2 text-3xl font-black">{history.length}</p></div>
        <div className="rounded-3xl bg-white p-6 shadow-sm"><ShieldCheck className="h-7 w-7 text-blue-700" /><p className="mt-4 text-sm text-slate-500">Vistorias</p><p className="mt-2 text-3xl font-black">{inspectionHistory.length}</p></div>
        <div className="rounded-3xl bg-white p-6 shadow-sm"><Wrench className="h-7 w-7 text-blue-700" /><p className="mt-4 text-sm text-slate-500">Total gasto</p><p className="mt-2 text-3xl font-black">{totalSpent.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p></div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black">Veículos</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {vehicleMatches.map((vehicle, index) => (
            <div key={`${vehicle.plate}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-black text-blue-700">{vehicle.plate}</p>
              <p className="mt-1 text-lg font-black text-slate-950">{vehicle.model}</p>
              <p className="mt-1 text-sm text-slate-600">Cliente: {vehicle.customer}</p>
              <p className="mt-1 text-sm text-slate-600">KM: {vehicle.mileage || "Não informado"}</p>
              <p className="mt-1 text-sm text-slate-600">Propulsão: {vehicle.powertrain}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-xl font-black">Histórico de ordens de serviço</h2>
          <p className="mt-2 text-sm text-slate-600">Digite uma placa para visualizar atendimentos anteriores.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {['OS', 'Cliente', 'Veículo', 'Propulsão', 'Serviço', 'Produto', 'Status', 'Total', 'Detalhe'].map((column) => <th key={column} className="px-5 py-4 font-black">{column}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.length > 0 ? history.map((item) => (
                <tr key={`${item.id}-${item.source}`} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-black text-slate-950">{item.code}</td>
                  <td className="px-5 py-4 text-slate-700">{item.customer}</td>
                  <td className="px-5 py-4 text-slate-700">{item.vehicle}</td>
                  <td className="px-5 py-4 text-slate-700">{item.powertrain}</td>
                  <td className="px-5 py-4 text-slate-700">{item.service}</td>
                  <td className="px-5 py-4 text-slate-700">{item.product}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{item.status}</span></td>
                  <td className="px-5 py-4 font-black text-slate-700">{item.total}</td>
                  <td className="px-5 py-4"><Link href={`/ordens-servico/${item.id}`} className="font-black text-blue-700">Abrir</Link></td>
                </tr>
              )) : (
                <tr><td colSpan={9} className="px-5 py-10 text-center text-slate-500">Digite uma placa para consultar o histórico.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
        <h2 className="text-xl font-black">Histórico de vistorias</h2>
        <div className="mt-5 grid gap-3">
          {inspectionHistory.length > 0 ? inspectionHistory.map((inspection) => (
            <div key={inspection.id} className="rounded-2xl bg-white/10 p-4">
              <p className="font-black">{inspection.plate} • {formatDate(inspection.createdAt)}</p>
              <p className="mt-2 text-sm text-slate-300">KM: {inspection.mileage} • Combustível: {inspection.fuelLevel}</p>
              <p className="mt-2 text-sm text-slate-300">Avarias: {inspection.damages.length > 0 ? inspection.damages.join(", ") : "Nenhuma marcada"}</p>
            </div>
          )) : <p className="text-sm text-slate-300">Nenhuma vistoria encontrada para a placa informada.</p>}
        </div>
      </div>
    </div>
  );
}
