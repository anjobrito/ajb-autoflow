"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { demoCustomers, demoProducts, demoServices, demoVehicles } from "@/lib/demo-data";
import { filterProductsByBusinessProfile, filterServicesByBusinessProfile, getOperationalFormLabels } from "@/lib/business-domain-options";
import { getBusinessProfileByLabel } from "@/lib/business-profiles";
import { currencyToNumber, getCompany, listCustomers, listEmployees, listProducts, listServices, listVehicles, numberToCurrency, saveWorkOrder, StoredCustomer, StoredEmployee, StoredProduct, StoredService, StoredVehicle } from "@/lib/browser-store";
import { newWorkOrderStatuses } from "@/lib/select-options";

function pct(value: number) {
  return `${value.toFixed(1).replace(".", ",")}%`;
}

type NewWorkOrderFormProps = {
  onSaved?: () => void;
  onCancel?: () => void;
  submitLabel?: string;
};

export function NewWorkOrderForm({ onSaved, onCancel, submitLabel = "Criar fluxo operacional" }: NewWorkOrderFormProps) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [customers, setCustomers] = useState<StoredCustomer[]>([]);
  const [vehicles, setVehicles] = useState<StoredVehicle[]>([]);
  const [products, setProducts] = useState<StoredProduct[]>([]);
  const [services, setServices] = useState<StoredService[]>([]);
  const [employees, setEmployees] = useState<StoredEmployee[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [businessType, setBusinessType] = useState("");

  const businessProfile = useMemo(() => getBusinessProfileByLabel(businessType), [businessType]);
  const formLabels = useMemo(() => getOperationalFormLabels(businessProfile), [businessProfile]);

  const productOptions = useMemo(() => {
    const allProducts = [
      ...products,
      ...demoProducts.map((product) => ({ ...product, supplier: "Fornecedor demo", costPrice: product.name.includes("Óleo") ? "R$ 30,00" : "R$ 20,00" })),
    ];
    return filterProductsByBusinessProfile(allProducts, businessProfile);
  }, [products, businessProfile]);

  const serviceOptions = useMemo(() => filterServicesByBusinessProfile([...services, ...demoServices], businessProfile), [services, businessProfile]);

  useEffect(() => {
    const loadedProducts = listProducts();
    const loadedServices = listServices();
    const loadedEmployees = listEmployees();
    const profile = getBusinessProfileByLabel(getCompany().businessType);
    const availableProducts = filterProductsByBusinessProfile([
      ...loadedProducts,
      ...demoProducts.map((product) => ({ ...product, supplier: "Fornecedor demo", costPrice: product.name.includes("Óleo") ? "R$ 30,00" : "R$ 20,00" })),
    ], profile);
    const availableServices = filterServicesByBusinessProfile([...loadedServices, ...demoServices], profile);

    setBusinessType(getCompany().businessType);
    setCustomers(listCustomers());
    setVehicles(listVehicles());
    setProducts(loadedProducts);
    setServices(loadedServices);
    setEmployees(loadedEmployees);
    setSelectedProduct(availableProducts[0]?.name ?? "");
    setSelectedService(availableServices[0]?.name ?? "");
    setSelectedEmployeeId(loadedEmployees[0]?.id ?? "");
  }, []);

  useEffect(() => {
    if (productOptions.length > 0 && !productOptions.some((item) => item.name === selectedProduct)) setSelectedProduct(productOptions[0].name);
    if (serviceOptions.length > 0 && !serviceOptions.some((item) => item.name === selectedService)) setSelectedService(serviceOptions[0].name);
  }, [productOptions, serviceOptions, selectedProduct, selectedService]);

  const product = productOptions.find((item) => item.name === selectedProduct);
  const service = serviceOptions.find((item) => item.name === selectedService);
  const responsibleEmployee = employees.find((employee) => employee.id === selectedEmployeeId);
  const qty = Math.max(0, Number(quantity || 0));

  const totals = useMemo(() => {
    const productCost = currencyToNumber(product?.costPrice ?? "R$ 0,00") * qty;
    const productSale = currencyToNumber(product?.price ?? "R$ 0,00") * qty;
    const serviceSale = currencyToNumber(service?.price ?? "R$ 0,00");
    const total = productSale + serviceSale;
    const profit = productSale - productCost + serviceSale;
    const margin = total > 0 ? (profit / total) * 100 : 0;
    return { productCost, productSale, serviceSale, total, profit, margin };
  }, [product, qty, service]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const record = saveWorkOrder({
      customer: String(formData.get("customer") ?? ""),
      vehicle: String(formData.get("vehicle") ?? ""),
      service: selectedService,
      product: selectedProduct,
      productQuantity: quantity,
      productCost: numberToCurrency(totals.productCost),
      productSale: numberToCurrency(totals.productSale),
      serviceSale: numberToCurrency(totals.serviceSale),
      partsTotal: numberToCurrency(totals.productSale),
      servicesTotal: numberToCurrency(totals.serviceSale),
      total: numberToCurrency(totals.total),
      estimatedProfit: numberToCurrency(totals.profit),
      estimatedMargin: pct(totals.margin),
      status: String(formData.get("status") ?? ""),
      responsibleEmployeeId: responsibleEmployee?.id,
      responsibleEmployeeName: responsibleEmployee?.name,
      notes: String(formData.get("notes") ?? ""),
    });

    setSaved(true);

    if (onSaved) {
      form.reset();
      onSaved();
      setSaved(false);
      return;
    }

    setTimeout(() => router.push(`/ordens-servico/${record.id}`), 700);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="rounded-3xl bg-white p-0">
        <h2 className="text-xl font-black text-slate-950">Dados do fluxo operacional</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Selecione cliente, veículo, etapa, item operacional e status inicial. Campos de domínio respeitam o perfil {businessProfile.label}.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-700">Cliente<select required name="customer" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{[...customers.map((c) => c.name), ...demoCustomers.map((c) => c.name)].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Veículo<select required name="vehicle" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{[...vehicles.map((v) => `${v.plate} - ${v.brand} ${v.model}`.trim()), ...demoVehicles.map((v) => `${v.plate} - ${v.model}`)].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">{formLabels.serviceLabel}<select value={selectedService} onChange={(event) => setSelectedService(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{serviceOptions.map((item) => <option key={item.name}>{item.name}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">{formLabels.productLabel}<select value={selectedProduct} onChange={(event) => setSelectedProduct(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{productOptions.map((item) => <option key={item.name}>{item.name}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">{formLabels.quantityLabel}<input required value={quantity} onChange={(event) => setQuantity(event.target.value)} inputMode="numeric" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" /></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Status<select required name="status" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">{newWorkOrderStatuses.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">{formLabels.responsibleLabel}<select value={selectedEmployeeId} onChange={(event) => setSelectedEmployeeId(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white"><option value="">Sem responsável definido</option>{employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}</select></label>
        </div>

        <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700"><span>Observações</span><textarea name="notes" className="min-h-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" placeholder="Descreva o serviço solicitado, orientação operacional ou observação para a equipe." /></label>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          {saved ? <span className="text-sm font-bold text-emerald-700">Fluxo criado!</span> : null}
          {onCancel ? <button type="button" onClick={onCancel} className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">Cancelar</button> : null}
          <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">{submitLabel}</button>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm font-bold text-blue-300">Resumo financeiro</p>
        <h2 className="mt-2 text-2xl font-black">Total: {numberToCurrency(totals.total)}</h2>
        <div className="mt-6 grid gap-3 text-sm text-slate-200">
          <div className="rounded-2xl bg-white/10 p-4">{formLabels.productSummaryLabel}: {numberToCurrency(totals.productSale)}</div>
          <div className="rounded-2xl bg-white/10 p-4">{formLabels.serviceSummaryLabel}: {numberToCurrency(totals.serviceSale)}</div>
          <div className="rounded-2xl bg-white/10 p-4">{formLabels.productCostSummaryLabel}: {numberToCurrency(totals.productCost)}</div>
          <div className="rounded-2xl bg-white/10 p-4">{formLabels.responsibleLabel}: {responsibleEmployee?.name ?? "Sem responsável definido"}</div>
          <div className="rounded-2xl bg-emerald-500/20 p-4 font-black text-emerald-200">Lucro estimado: {numberToCurrency(totals.profit)}</div>
          <div className="rounded-2xl bg-blue-500/20 p-4 font-black text-blue-100">Margem estimada: {pct(totals.margin)}</div>
        </div>
      </div>
    </form>
  );
}
