export type StoredCustomer = {
  id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  city: string;
  state: string;
};

export type StoredVehicle = {
  id: string;
  customer: string;
  plate: string;
  brand: string;
  model: string;
  year: string;
  mileage: string;
  powertrain: string;
};

export type StoredSupplier = {
  id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  city: string;
  state: string;
};

export type StoredProduct = {
  id: string;
  name: string;
  category: string;
  supplier: string;
  stock: string;
  minStock: string;
  costPrice: string;
  price: string;
};

export type StoredService = {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: string;
  status: string;
};

export type StoredWorkOrder = {
  id: string;
  code: string;
  customer: string;
  vehicle: string;
  service: string;
  product: string;
  productQuantity: string;
  productCost: string;
  productSale: string;
  serviceSale: string;
  partsTotal: string;
  servicesTotal: string;
  total: string;
  estimatedProfit: string;
  estimatedMargin: string;
  status: string;
  notes: string;
  startedAt?: string;
  finishedAt?: string;
};

export type StoredInspection = {
  id: string;
  workOrderId: string;
  plate: string;
  mileage: string;
  fuelLevel: string;
  hasDocuments: boolean;
  hasSpareTire: boolean;
  hasJack: boolean;
  hasPersonalItems: boolean;
  personalItems: string;
  damages: string[];
  notes: string;
  createdAt: string;
};

export type StoredReminder = {
  id: string;
  type: string;
  customer: string;
  plate: string;
  dueDate: string;
  channel: string;
  message: string;
  status: "Pendente" | "Enviado" | "Cancelado";
  createdAt: string;
};

export type StoredFinancialEntry = {
  id: string;
  type: "Pagar" | "Receber";
  description: string;
  category: string;
  amount: string;
  dueDate: string;
  status: "Pendente" | "Pago" | "Recebido" | "Vencido" | "Cancelado";
  paymentMethod: string;
  notes: string;
  createdAt: string;
  updatedAt?: string;
};

export type StoredCompany = {
  tradeName: string;
  legalName: string;
  cnpj: string;
  businessType: string;
  city: string;
  state: string;
  phone: string;
  email: string;
};

const companyKey = "ajb-autoflow-company";
const workOrdersKey = "ajb-autoflow-work-orders";
const inspectionsKey = "ajb-autoflow-inspections";
const remindersKey = "ajb-autoflow-reminders";
const financialEntriesKey = "ajb-autoflow-financial-entries";

function readList<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(key);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function writeList<T>(key: string, value: T[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getCompany(): StoredCompany {
  if (typeof window === "undefined") return defaultCompany;
  const raw = window.localStorage.getItem(companyKey);
  if (!raw) return defaultCompany;
  try {
    return JSON.parse(raw) as StoredCompany;
  } catch {
    return defaultCompany;
  }
}

export function saveCompany(company: StoredCompany) {
  if (typeof window === "undefined") return company;
  window.localStorage.setItem(companyKey, JSON.stringify(company));
  return company;
}

export const defaultCompany: StoredCompany = {
  tradeName: "AutoFlow Garage",
  legalName: "Oficina Demo AutoFlow Ltda",
  cnpj: "12.345.678/0001-90",
  businessType: "Oficina mecânica e lava-jato",
  city: "Araras",
  state: "SP",
  phone: "(19) 99999-0000",
  email: "contato@ajbsystems.com.br",
};

export function listCustomers() { return readList<StoredCustomer>("ajb-autoflow-customers"); }
export function saveCustomer(customer: Omit<StoredCustomer, "id">) {
  const record = { ...customer, id: crypto.randomUUID() };
  writeList("ajb-autoflow-customers", [record, ...listCustomers()]);
  return record;
}

export function listVehicles() { return readList<StoredVehicle>("ajb-autoflow-vehicles"); }
export function saveVehicle(vehicle: Omit<StoredVehicle, "id">) {
  const record = { ...vehicle, id: crypto.randomUUID() };
  writeList("ajb-autoflow-vehicles", [record, ...listVehicles()]);
  return record;
}

export function listSuppliers() { return readList<StoredSupplier>("ajb-autoflow-suppliers"); }
export function saveSupplier(supplier: Omit<StoredSupplier, "id">) {
  const record = { ...supplier, id: crypto.randomUUID() };
  writeList("ajb-autoflow-suppliers", [record, ...listSuppliers()]);
  return record;
}

export function listProducts() { return readList<StoredProduct>("ajb-autoflow-products"); }
export function saveProduct(product: Omit<StoredProduct, "id">) {
  const record = { ...product, id: crypto.randomUUID() };
  writeList("ajb-autoflow-products", [record, ...listProducts()]);
  return record;
}

export function updateProductStock(productName: string, quantity: number) {
  const updated = listProducts().map((product) => product.name !== productName ? product : { ...product, stock: String(Math.max(0, Number(product.stock || 0) - quantity)) });
  writeList("ajb-autoflow-products", updated);
}

export function listServices() { return readList<StoredService>("ajb-autoflow-services"); }
export function saveService(service: Omit<StoredService, "id">) {
  const record = { ...service, id: crypto.randomUUID() };
  writeList("ajb-autoflow-services", [record, ...listServices()]);
  return record;
}

export function listWorkOrders() { return readList<StoredWorkOrder>(workOrdersKey); }
export function saveWorkOrder(order: Omit<StoredWorkOrder, "id" | "code">) {
  const orders = listWorkOrders();
  const nextNumber = 2000 + orders.length + 1;
  const record = { ...order, id: `os-${nextNumber}`, code: `OS-${nextNumber}` };
  writeList(workOrdersKey, [record, ...orders]);
  const quantity = Number(order.productQuantity || 0);
  if (order.product && quantity > 0) updateProductStock(order.product, quantity);
  return record;
}

export function updateWorkOrderStatus(id: string, status: string) {
  const timestamp = new Date().toISOString();
  const updated = listWorkOrders().map((order) => order.id !== id ? order : { ...order, status, startedAt: status === "Em andamento" ? timestamp : order.startedAt, finishedAt: status === "Pronta para retirada" ? timestamp : order.finishedAt });
  writeList(workOrdersKey, updated);
  return updated.find((order) => order.id === id);
}

export function findWorkOrderById(id: string) { return listWorkOrders().find((order) => order.id === id); }

export function listInspections() { return readList<StoredInspection>(inspectionsKey); }
export function findInspectionByWorkOrderId(workOrderId: string) { return listInspections().find((inspection) => inspection.workOrderId === workOrderId); }
export function saveInspection(inspection: Omit<StoredInspection, "id" | "createdAt">) {
  const inspections = listInspections().filter((item) => item.workOrderId !== inspection.workOrderId);
  const record = { ...inspection, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  writeList(inspectionsKey, [record, ...inspections]);
  return record;
}

export function listReminders() { return readList<StoredReminder>(remindersKey); }
export function saveReminder(reminder: Omit<StoredReminder, "id" | "createdAt" | "status">) {
  const record: StoredReminder = { ...reminder, id: crypto.randomUUID(), status: "Pendente", createdAt: new Date().toISOString() };
  writeList(remindersKey, [record, ...listReminders()]);
  return record;
}
export function updateReminderStatus(id: string, status: StoredReminder["status"]) {
  const updated = listReminders().map((reminder) => reminder.id === id ? { ...reminder, status } : reminder);
  writeList(remindersKey, updated);
  return updated.find((reminder) => reminder.id === id);
}

export function listFinancialEntries() { return readList<StoredFinancialEntry>(financialEntriesKey); }
export function saveFinancialEntry(entry: Omit<StoredFinancialEntry, "id" | "createdAt" | "updatedAt">) {
  const record: StoredFinancialEntry = { ...entry, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  writeList(financialEntriesKey, [record, ...listFinancialEntries()]);
  return record;
}
export function updateFinancialEntryStatus(id: string, status: StoredFinancialEntry["status"]) {
  const updated = listFinancialEntries().map((entry) => entry.id === id ? { ...entry, status, updatedAt: new Date().toISOString() } : entry);
  writeList(financialEntriesKey, updated);
  return updated.find((entry) => entry.id === id);
}

export function currencyToNumber(value: string) {
  const parsed = Number(value.replace("R$", "").replace(/\./g, "").replace(",", ".").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}
export function numberToCurrency(value: number) { return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); }
export function calculateMargin(costPrice: string, salePrice: string) {
  const cost = currencyToNumber(costPrice);
  const sale = currencyToNumber(salePrice);
  const profit = sale - cost;
  const margin = sale > 0 ? (profit / sale) * 100 : 0;
  return { profit, margin };
}

export function getDashboardStats() {
  const workOrders = listWorkOrders();
  const products = listProducts();
  return {
    customers: listCustomers().length,
    vehicles: listVehicles().length,
    suppliers: listSuppliers().length,
    products: products.length,
    services: listServices().length,
    reminders: listReminders().length,
    workOrders: workOrders.length,
    openWorkOrders: workOrders.filter((order) => order.status !== "Pronta para retirada").length,
    readyWorkOrders: workOrders.filter((order) => order.status === "Pronta para retirada").length,
    lowStock: products.filter((product) => Number(product.stock) <= Number(product.minStock)).length,
  };
}

export function getFinancialSummary() {
  const workOrders = listWorkOrders();
  const revenue = workOrders.reduce((sum, order) => sum + currencyToNumber(order.total), 0);
  const profit = workOrders.reduce((sum, order) => sum + currencyToNumber(order.estimatedProfit || "0"), 0);
  const ticket = workOrders.length > 0 ? revenue / workOrders.length : 0;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
  return { revenue, profit, ticket, margin, workOrders: workOrders.length };
}
