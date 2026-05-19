"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Banknote, Car, FileText, Pencil, Search, ShieldCheck, Trash2, Users } from "lucide-react";
import { currencyToNumber, listCustomers, listEmployees, listVehicles, numberToCurrency, StoredCustomer, StoredEmployee, StoredVehicle } from "@/lib/browser-store";
import {
  createEmptyVehicleFinancingDraft,
  deleteVehicleFinancing,
  financingStatusOptions,
  getFinancingStatusLabel,
  getLienStatusLabel,
  lienStatusOptions,
  listVehicleFinancings,
  saveVehicleFinancing,
  StoredVehicleFinancing,
  updateVehicleFinancing,
  VehicleFinancingDraft,
} from "@/lib/vehicle-financing-store";

const inputClass = "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500";
const labelClass = "grid gap-2 text-sm font-bold text-slate-700";

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function matchesSearch(record: StoredVehicleFinancing, search: string) {
  if (!search.trim()) return true;
  const target = normalize([
    record.customerName,
    record.customerDocument,
    record.customerPhone,
    record.vehiclePlate,
    record.vehicleChassis,
    record.vehicleBrand,
    record.vehicleModel,
    record.contractNumber,
    record.financedBank,
    record.sellerName,
    record.branchName,
  ].join(" "));
  return target.includes(normalize(search));
}

function matchesDateRange(recordDate: string, dateFrom: string, dateTo: string) {
  if (dateFrom && recordDate < dateFrom) return false;
  if (dateTo && recordDate > dateTo) return false;
  return true;
}

function badgeClass(status: string) {
  if (["APROVADO", "PAGO", "REGISTRADO", "BAIXADO"].includes(status)) return "bg-emerald-50 text-emerald-700";
  if (["EM_ANALISE", "CONTRATO_EMITIDO"].includes(status)) return "bg-blue-50 text-blue-700";
  if (["GRAVAME_PENDENTE", "PENDENTE", "BAIXA_SOLICITADA"].includes(status)) return "bg-amber-50 text-amber-700";
  if (["CANCELADO", "RECUSADO", "COM_ERRO"].includes(status)) return "bg-red-50 text-red-700";
  return "bg-slate-100 text-slate-700";
}

function getRecordIssues(record: StoredVehicleFinancing) {
  const issues: string[] = [];
  if (!record.customerDocument.trim()) issues.push("Cliente sem CPF/CNPJ");
  if (!record.vehiclePlate.trim()) issues.push("Veiculo sem placa");
  if (!record.vehicleChassis.trim()) issues.push("Veiculo sem chassi");
  if (record.financingStatus === "APROVADO" && record.lienStatus !== "REGISTRADO") issues.push("Aprovado sem gravame registrado");
  if (currencyToNumber(record.returnAmount) > 0 && !record.returnReceived) issues.push("Retorno financeiro pendente");
  if (!record.customerId) issues.push("Nao vinculado a cliente cadastrado");
  if (!record.vehicleId) issues.push("Nao vinculado a veiculo cadastrado");
  return issues;
}

export function VehicleFinancingClient() {
  const [records, setRecords] = useState<StoredVehicleFinancing[]>([]);
  const [customers, setCustomers] = useState<StoredCustomer[]>([]);
  const [vehicles, setVehicles] = useState<StoredVehicle[]>([]);
  const [employees, setEmployees] = useState<StoredEmployee[]>([]);
  const [form, setForm] = useState<VehicleFinancingDraft>(() => createEmptyVehicleFinancingDraft());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [financingStatusFilter, setFinancingStatusFilter] = useState("TODOS");
  const [lienStatusFilter, setLienStatusFilter] = useState("TODOS");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  function refresh() {
    setRecords(listVehicleFinancings());
    setCustomers(listCustomers());
    setVehicles(listVehicles());
    setEmployees(listEmployees());
  }

  useEffect(() => {
    refresh();
  }, []);

  function updateField<K extends keyof VehicleFinancingDraft>(field: K, value: VehicleFinancingDraft[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setForm(createEmptyVehicleFinancingDraft());
    setEditingId(null);
  }

  function handleCustomerSelect(customerId: string) {
    const customer = customers.find((item) => item.id === customerId);
    if (!customer) {
      setForm((current) => ({ ...current, customerId: undefined }));
      return;
    }

    setForm((current) => ({
      ...current,
      customerId: customer.id,
      customerName: customer.name,
      customerDocument: customer.document,
      customerPhone: customer.phone,
    }));
  }

  function handleVehicleSelect(vehicleId: string) {
    const vehicle = vehicles.find((item) => item.id === vehicleId);
    if (!vehicle) {
      setForm((current) => ({ ...current, vehicleId: undefined }));
      return;
    }

    setForm((current) => ({
      ...current,
      vehicleId: vehicle.id,
      vehicleBrand: vehicle.brand,
      vehicleModel: vehicle.model,
      vehiclePlate: vehicle.plate,
      vehicleYear: vehicle.year,
      customerName: current.customerName || vehicle.customer,
    }));
  }

  function handleSellerSelect(sellerId: string) {
    const employee = employees.find((item) => item.id === sellerId);
    if (!employee) {
      setForm((current) => ({ ...current, sellerId: undefined }));
      return;
    }

    setForm((current) => ({
      ...current,
      sellerId: employee.id,
      sellerName: employee.name,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editingId) updateVehicleFinancing(editingId, form);
    else saveVehicleFinancing(form);
    refresh();
    resetForm();
  }

  function handleEdit(record: StoredVehicleFinancing) {
    const { id, createdAt, updatedAt, ...draft } = record;
    setEditingId(id);
    setForm(draft);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id: string) {
    if (!window.confirm("Deseja excluir este financiamento/gravame?")) return;
    deleteVehicleFinancing(id);
    refresh();
    if (editingId === id) resetForm();
  }

  const filteredRecords = useMemo(() => records.filter((record) => {
    const matchesFinancing = financingStatusFilter === "TODOS" || record.financingStatus === financingStatusFilter;
    const matchesLien = lienStatusFilter === "TODOS" || record.lienStatus === lienStatusFilter;
    return matchesSearch(record, search) && matchesFinancing && matchesLien && matchesDateRange(record.date, dateFrom, dateTo);
  }), [records, search, financingStatusFilter, lienStatusFilter, dateFrom, dateTo]);

  const summary = useMemo(() => filteredRecords.reduce((acc, record) => {
    const issues = getRecordIssues(record);
    acc.contracts += 1;
    acc.financed += currencyToNumber(record.financedAmount);
    acc.returnExpected += currencyToNumber(record.returnAmount);
    acc.returnReceived += record.returnReceived ? currencyToNumber(record.returnAmount) : 0;
    acc.linkedCustomers += record.customerId ? 1 : 0;
    acc.linkedVehicles += record.vehicleId ? 1 : 0;
    acc.linkedSellers += record.sellerId ? 1 : 0;
    acc.pendingIssues += issues.length;
    if (record.lienStatus === "PENDENTE") acc.pendingLiens += 1;
    if (record.lienStatus === "REGISTRADO") acc.registeredLiens += 1;
    return acc;
  }, { contracts: 0, financed: 0, returnExpected: 0, returnReceived: 0, pendingLiens: 0, registeredLiens: 0, linkedCustomers: 0, linkedVehicles: 0, linkedSellers: 0, pendingIssues: 0 }), [filteredRecords]);

  const pendingItems = useMemo(() => filteredRecords.map((record) => ({ record, issues: getRecordIssues(record) })).filter((item) => item.issues.length > 0).slice(0, 6), [filteredRecords]);

  const cards = [
    { label: "Contratos", value: String(summary.contracts), icon: FileText },
    { label: "Valor financiado", value: numberToCurrency(summary.financed), icon: Banknote },
    { label: "Retorno previsto", value: numberToCurrency(summary.returnExpected), icon: Banknote },
    { label: "Retorno recebido", value: numberToCurrency(summary.returnReceived), icon: Banknote },
    { label: "Gravames pendentes", value: String(summary.pendingLiens), icon: ShieldCheck },
    { label: "Gravames registrados", value: String(summary.registeredLiens), icon: ShieldCheck },
    { label: "Clientes vinculados", value: String(summary.linkedCustomers), icon: Users },
    { label: "Veiculos vinculados", value: String(summary.linkedVehicles), icon: Car },
    { label: "Pendencias", value: String(summary.pendingIssues), icon: AlertTriangle },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{card.label}</p>
                <Icon className="h-5 w-5 text-blue-700" />
              </div>
              <p className="mt-4 text-3xl font-black">{card.value}</p>
            </div>
          );
        })}
      </div>

      {pendingItems.length > 0 ? (
        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-700" />
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-amber-700">Pendencias operacionais</p>
              <h2 className="text-xl font-black text-slate-950">Itens que precisam de conferencia</h2>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {pendingItems.map(({ record, issues }) => (
              <div key={record.id} className="rounded-2xl bg-white p-4 text-sm shadow-sm">
                <p className="font-black">{record.customerName || "Cliente nao informado"} • {record.vehiclePlate || record.vehicleModel || "Veiculo sem identificacao"}</p>
                <p className="mt-1 text-slate-500">Contrato: {record.contractNumber || "nao informado"}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {issues.map((issue) => <span key={issue} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">{issue}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-blue-700">Cadastro integrado</p>
            <h2 className="mt-1 text-2xl font-black">{editingId ? "Editar financiamento" : "Novo financiamento/gravame"}</h2>
            <p className="mt-2 text-sm text-slate-600">Selecione cadastros existentes para preencher dados automaticamente, mantendo os campos editáveis para ajustes manuais.</p>
          </div>
          <button type="button" onClick={resetForm} className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">Limpar</button>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-black uppercase tracking-wide text-blue-700">Cadastros existentes</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className={labelClass}>Cliente existente<select value={form.customerId ?? ""} onChange={(event) => handleCustomerSelect(event.target.value)} className={inputClass}><option value="">Selecionar cliente</option>{customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name} • {customer.document}</option>)}</select></label>
            <label className={labelClass}>Veiculo existente<select value={form.vehicleId ?? ""} onChange={(event) => handleVehicleSelect(event.target.value)} className={inputClass}><option value="">Selecionar veiculo</option>{vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.plate} • {vehicle.brand} {vehicle.model}</option>)}</select></label>
            <label className={labelClass}>Vendedor existente<select value={form.sellerId ?? ""} onChange={(event) => handleSellerSelect(event.target.value)} className={inputClass}><option value="">Selecionar vendedor</option>{employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name} • {employee.role}</option>)}</select></label>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <label className={labelClass}>Data<input type="date" value={form.date} onChange={(event) => updateField("date", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>Cliente<input value={form.customerName} onChange={(event) => updateField("customerName", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>CPF/CNPJ<input value={form.customerDocument} onChange={(event) => updateField("customerDocument", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>Telefone<input value={form.customerPhone} onChange={(event) => updateField("customerPhone", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>Vendedor<input value={form.sellerName} onChange={(event) => updateField("sellerName", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>Banco financiado<input value={form.financedBank} onChange={(event) => updateField("financedBank", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>Marca<input value={form.vehicleBrand} onChange={(event) => updateField("vehicleBrand", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>Modelo<input value={form.vehicleModel} onChange={(event) => updateField("vehicleModel", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>Placa<input value={form.vehiclePlate} onChange={(event) => updateField("vehiclePlate", event.target.value.toUpperCase())} className={inputClass} /></label>
          <label className={labelClass}>Chassi<input value={form.vehicleChassis} onChange={(event) => updateField("vehicleChassis", event.target.value.toUpperCase())} className={inputClass} /></label>
          <label className={labelClass}>Ano<input value={form.vehicleYear} onChange={(event) => updateField("vehicleYear", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>Contrato<input value={form.contractNumber} onChange={(event) => updateField("contractNumber", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>Valor solicitado<input value={form.requestedAmount} onChange={(event) => updateField("requestedAmount", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>Entrada<input value={form.downPaymentAmount} onChange={(event) => updateField("downPaymentAmount", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>Valor financiado<input value={form.financedAmount} onChange={(event) => updateField("financedAmount", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>% retorno<input value={form.returnPercentage} onChange={(event) => updateField("returnPercentage", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>Valor retorno<input value={form.returnAmount} onChange={(event) => updateField("returnAmount", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>Seguro prestamista<input value={form.prestamistaInsuranceAmount} onChange={(event) => updateField("prestamistaInsuranceAmount", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>Filial<input value={form.branchName} onChange={(event) => updateField("branchName", event.target.value)} className={inputClass} /></label>
          <label className={labelClass}>Status financiamento<select value={form.financingStatus} onChange={(event) => updateField("financingStatus", event.target.value as VehicleFinancingDraft["financingStatus"])} className={inputClass}>{financingStatusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
          <label className={labelClass}>Status gravame<select value={form.lienStatus} onChange={(event) => updateField("lienStatus", event.target.value as VehicleFinancingDraft["lienStatus"])} className={inputClass}>{lienStatusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700"><input type="checkbox" checked={form.returnReceived} onChange={(event) => updateField("returnReceived", event.target.checked)} />Retorno recebido</label>
        </div>

        <label className={`${labelClass} mt-4`}>Observacoes<textarea value={form.notes} onChange={(event) => updateField("notes", event.target.value)} className={`${inputClass} min-h-24`} /></label>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white hover:bg-blue-700">{editingId ? "Salvar alteracoes" : "Cadastrar financiamento"}</button>
          {editingId ? <button type="button" onClick={resetForm} className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-black text-slate-700 hover:bg-slate-50">Cancelar edicao</button> : null}
        </div>
      </form>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 xl:grid-cols-[1fr_900px] xl:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-blue-700">Busca e acompanhamento</p>
            <h2 className="mt-1 text-2xl font-black">Contratos cadastrados</h2>
            <p className="mt-2 text-sm text-slate-600">Pesquise por cliente, CPF/CNPJ, placa, chassi, contrato, banco, vendedor ou filial.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-5">
            <label className="relative md:col-span-2"><Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Busca rapida" className={`${inputClass} pl-10`} /></label>
            <input type="date" value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} className={inputClass} aria-label="Data inicial" />
            <input type="date" value={dateTo} onChange={(event) => setDateTo(event.target.value)} className={inputClass} aria-label="Data final" />
            <button type="button" onClick={() => { setSearch(""); setDateFrom(""); setDateTo(""); setFinancingStatusFilter("TODOS"); setLienStatusFilter("TODOS"); }} className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">Limpar filtros</button>
            <select value={financingStatusFilter} onChange={(event) => setFinancingStatusFilter(event.target.value)} className={inputClass}><option value="TODOS">Todos financiamentos</option>{financingStatusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
            <select value={lienStatusFilter} onChange={(event) => setLienStatusFilter(event.target.value)} className={inputClass}><option value="TODOS">Todos gravames</option>{lienStatusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500"><th className="px-3 py-3">Cliente</th><th className="px-3 py-3">Veiculo</th><th className="px-3 py-3">Banco/contrato</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Valores</th><th className="px-3 py-3">Acoes</th></tr></thead>
            <tbody>
              {filteredRecords.length > 0 ? filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-slate-100 align-top">
                  <td className="px-3 py-4"><p className="font-black">{record.customerName || "Cliente nao informado"}</p><p className="mt-1 text-slate-500">{record.customerDocument}</p><p className="text-slate-500">{record.customerPhone}</p>{record.customerId ? <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Cliente vinculado</span> : null}</td>
                  <td className="px-3 py-4"><div className="flex items-start gap-2"><Car className="mt-0.5 h-4 w-4 text-blue-700" /><div><p className="font-black">{record.vehicleBrand} {record.vehicleModel}</p><p className="mt-1 text-slate-500">Placa: {record.vehiclePlate || "nao informada"}</p><p className="text-slate-500">Chassi: {record.vehicleChassis || "nao informado"}</p>{record.vehicleId ? <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Veiculo vinculado</span> : null}</div></div></td>
                  <td className="px-3 py-4"><p className="font-black">{record.financedBank || "Banco nao informado"}</p><p className="mt-1 text-slate-500">{record.contractNumber || "Contrato nao informado"}</p><p className="text-slate-500">{record.sellerName || "Sem vendedor"} • {record.branchName}</p>{record.sellerId ? <span className="mt-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">Vendedor vinculado</span> : null}</td>
                  <td className="px-3 py-4"><div className="grid gap-2"><span className={`rounded-full px-3 py-1 text-xs font-black ${badgeClass(record.financingStatus)}`}>{getFinancingStatusLabel(record.financingStatus)}</span><span className={`rounded-full px-3 py-1 text-xs font-black ${badgeClass(record.lienStatus)}`}>{getLienStatusLabel(record.lienStatus)}</span></div></td>
                  <td className="px-3 py-4"><p><strong>Financiado:</strong> {record.financedAmount}</p><p className="mt-1 text-slate-500">Retorno: {record.returnAmount}</p><p className="text-slate-500">{record.returnReceived ? "Retorno recebido" : "Retorno pendente"}</p></td>
                  <td className="px-3 py-4"><div className="flex gap-2"><button type="button" onClick={() => handleEdit(record)} className="rounded-xl border border-slate-200 p-3 text-blue-700 hover:bg-blue-50" aria-label="Editar"><Pencil className="h-4 w-4" /></button><button type="button" onClick={() => handleDelete(record.id)} className="rounded-xl border border-slate-200 p-3 text-red-700 hover:bg-red-50" aria-label="Excluir"><Trash2 className="h-4 w-4" /></button></div></td>
                </tr>
              )) : <tr><td colSpan={6} className="px-3 py-10 text-center text-slate-500">Nenhum financiamento encontrado. Cadastre o primeiro contrato para substituir a planilha manual.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
