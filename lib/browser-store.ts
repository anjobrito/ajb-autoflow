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
  powertrain?: string;
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

export type StoredEmployee = {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  role: string;
  employmentType: string;
  status: string;
  serviceCommissionType?: string;
  serviceCommissionValue?: string;
  partCommissionType?: string;
  partCommissionValue?: string;
  washCommissionType?: string;
  washCommissionValue?: string;
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
  responsibleEmployeeId?: string;
  responsibleEmployeeName?: string;
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

export type StoredCommissionStatus = "Pendente" | "Paga" | "Cancelada";
export type StoredCommissionTargetType = "Serviço" | "Produto/peça" | "Lavagem";
export type StoredCommissionValueType = "Percentual" | "Valor fixo";

export type StoredCommission = {
  id: string;
  employeeId?: string;
  employeeName: string;
  targetType: StoredCommissionTargetType | string;
  targetName: string;
  valueType: StoredCommissionValueType | string;
  value: string;
  baseAmount?: string;
  calculatedAmount?: string;
  status: StoredCommissionStatus | string;
  referenceDate?: string;
  paidAt?: string;
  sourceWorkOrderId?: string;
  sourceWorkOrderCode?: string;
  financialEntryId?: string;
  notes: string;
  createdAt: string;
  updatedAt?: string;
};

export type FinancialEntryType = "Pagar" | "Receber";
export type FinancialEntryStatus = "Pendente" | "Pago" | "Recebido" | "Vencido" | "Cancelado";

export type StoredFinancialEntry = {
  id: string;
  type: FinancialEntryType;
  description: string;
  category: string;
  amount: string;
  dueDate: string;
  status: FinancialEntryStatus;
  paymentMethod: string;
  notes: string;
  createdAt: string;
  updatedAt?: string;
  personName?: string;
  reference?: string;
  settledAt?: string;
};

export type FinancialEntrySummary = {
  total: number;
  pending: number;
  settled: number;
  overdue: number;
  cancelled: number;
  count: number;
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
const employeesKey = "ajb-autoflow-employees";
const workOrdersKey = "ajb-autoflow-work-orders";
const inspectionsKey = "ajb-autoflow-inspections";
const remindersKey = "ajb-autoflow-reminders";
const commissionsKey = "ajb-autoflow-commissions";
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

function normalizeCommissionStatusForFinancial(status: string): StoredFinancialEntry["status"] {
  if (status === "Paga") return "Pago";
  if (status === "Cancelada") return "Cancelado";
  return "Pendente";
}

function buildCommissionFinancialEntry(commission: StoredCommission, existing?: StoredFinancialEntry): StoredFinancialEntry {
  const timestamp = new Date().toISOString();
  const workOrderSuffix = commission.sourceWorkOrderCode ? ` • ${commission.sourceWorkOrderCode}` : "";

  return {
    id: existing?.id ?? crypto.randomUUID(),
    type: "Pagar",
    description: `Comissão ${commission.employeeName}${workOrderSuffix}`,
    category: "Comissões",
    amount: commission.calculatedAmount || "R$ 0,00",
    dueDate: commission.referenceDate || new Date().toISOString().slice(0, 10),
    status: normalizeCommissionStatusForFinancial(commission.status),
    paymentMethod: existing?.paymentMethod || "Outro",
    notes: commission.notes || `Gerado pelo módulo de comissões para ${commission.targetType}: ${commission.targetName}`,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
  };
}

function syncCommissionFinancialEntry(commission: StoredCommission): StoredCommission {
  if (commission.status === "Cancelada") {
    if (!commission.financialEntryId) return commission;
    const cancelledEntries = listFinancialEntries().map((entry) => entry.id === commission.financialEntryId ? { ...entry, status: "Cancelado" as const, updatedAt: new Date().toISOString() } : entry);
    writeList(financialEntriesKey, cancelledEntries);
    return commission;
  }

  const entries = listFinancialEntries();
  const existing = commission.financialEntryId ? entries.find((entry) => entry.id === commission.financialEntryId) : undefined;
  const financialEntry = buildCommissionFinancialEntry(commission, existing);
  const updatedEntries = existing ? entries.map((entry) => entry.id === financialEntry.id ? financialEntry : entry) : [financialEntry, ...entries];
  writeList(financialEntriesKey, updatedEntries);
  return { ...commission, financialEntryId: financialEntry.id };
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

export function listEmployees() { return readList<StoredEmployee>(employeesKey); }
export function saveEmployee(employee: Omit<StoredEmployee, "id">) {
  const record = { ...employee, id: crypto.randomUUID() };
  writeList(employeesKey, [record, ...listEmployees()]);
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

export function listCommissions() { return readList<StoredCommission>(commissionsKey); }
export function findCommissionById(id: string) { return listCommissions().find((commission) => commission.id === id); }
export function findCommissionsByWorkOrderId(workOrderId: string) { return listCommissions().filter((commission) => commission.sourceWorkOrderId === workOrderId); }
export function saveCommission(commission: Omit<StoredCommission, "id" | "createdAt" | "updatedAt" | "paidAt" | "financialEntryId">) {
  const timestamp = new Date().toISOString();
  const draft: StoredCommission = { ...commission, id: crypto.randomUUID(), createdAt: timestamp, updatedAt: timestamp };
  const record = syncCommissionFinancialEntry(draft);
  writeList(commissionsKey, [record, ...listCommissions()]);
  return record;
}
export function updateCommission(id: string, commission: Partial<Omit<StoredCommission, "id" | "createdAt">>) {
  const timestamp = new Date().toISOString();
  let saved: StoredCommission | undefined;
  const updated = listCommissions().map((item) => {
    if (item.id !== id) return item;
    const merged = syncCommissionFinancialEntry({ ...item, ...commission, updatedAt: timestamp });
    saved = merged;
    return merged;
  });
  writeList(commissionsKey, updated);
  return saved;
}
export function updateCommissionStatus(id: string, status: StoredCommissionStatus) {
  const timestamp = new Date().toISOString();
  let saved: StoredCommission | undefined;
  const updated = listCommissions().map((commission) => {
    if (commission.id !== id) return commission;
    const merged = syncCommissionFinancialEntry({ ...commission, status, paidAt: status === "Paga" ? timestamp : undefined, updatedAt: timestamp });
    saved = merged;
    return merged;
  });
  writeList(commissionsKey, updated);
  return saved;
}
export function deleteCommission(id: string) {
  const commission = findCommissionById(id);
  if (commission?.financialEntryId) {
    const updatedEntries = listFinancialEntries().map((entry) => entry.id === commission.financialEntryId ? { ...entry, status: "Cancelado" as const, updatedAt: new Date().toISOString() } : entry);
    writeList(financialEntriesKey, updatedEntries);
  }
  const updated = listCommissions().filter((item) => item.id !== id);
  writeList(commissionsKey, updated);
  return updated;
}

export function createCommissionFromWorkOrder(workOrderId: string, targetType: StoredCommissionTargetType = "Serviço") {
  const order = findWorkOrderById(workOrderId);
  if (!order) return undefined;
  const employee = order.responsibleEmployeeId ? listEmployees().find((item) => item.id === order.responsibleEmployeeId) : undefined;
  if (!employee) return undefined;

  const rule = getEmployeeCommissionRule(employee, targetType);
  if (!rule || rule.valueType === "Sem comissão") return undefined;

  const baseAmount = targetType === "Produto/peça" ? order.partsTotal || order.productSale || order.total : targetType === "Lavagem" ? order.serviceSale || order.servicesTotal || order.total : order.servicesTotal || order.serviceSale || order.total;
  const targetName = targetType === "Produto/peça" ? order.product || "Produto/peça da OS" : targetType === "Lavagem" ? order.service || "Lavagem da OS" : order.service || "Serviço da OS";
  const calculatedAmount = numberToCurrency(calculateCommissionAmount(baseAmount, rule.valueType, rule.value));

  const existing = findCommissionsByWorkOrderId(workOrderId).find((commission) => commission.targetType === targetType && commission.employeeId === employee.id);
  if (existing) return existing;

  return saveCommission({
    employeeId: employee.id,
    employeeName: employee.name,
    targetType,
    targetName,
    valueType: rule.valueType,
    value: rule.value,
    baseAmount,
    calculatedAmount,
    status: "Pendente",
    referenceDate: new Date().toISOString().slice(0, 10),
    sourceWorkOrderId: order.id,
    sourceWorkOrderCode: order.code,
    notes: `Comissão sugerida a partir da ${order.code}.`,
  });
}

export function listFinancialEntries() { return readList<StoredFinancialEntry>(financialEntriesKey); }
export function listAccountsPayable() { return listFinancialEntries().filter((entry) => entry.type === "Pagar"); }
export function listAccountsReceivable() { return listFinancialEntries().filter((entry) => entry.type === "Receber"); }

function todayDateOnly() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function parseDateOnly(value: string) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function isEntryOverdue(entry: StoredFinancialEntry) {
  if (entry.status !== "Pendente") return false;
  const dueDate = parseDateOnly(entry.dueDate);
  if (!dueDate) return false;
  return dueDate < todayDateOnly();
}

export function saveFinancialEntry(entry: Omit<StoredFinancialEntry, "id" | "createdAt" | "updatedAt">) {
  const record: StoredFinancialEntry = { ...entry, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  writeList(financialEntriesKey, [record, ...listFinancialEntries()]);
  return record;
}

export function updateFinancialEntry(id: string, entry: Omit<StoredFinancialEntry, "id" | "createdAt" | "updatedAt">) {
  let updatedRecord: StoredFinancialEntry | undefined;
  const updated = listFinancialEntries().map((current) => {
    if (current.id !== id) return current;

    updatedRecord = {
      ...current,
      ...entry,
      updatedAt: new Date().toISOString(),
      settledAt: entry.status === "Pago" || entry.status === "Recebido"
        ? entry.settledAt || current.settledAt || new Date().toISOString().slice(0, 10)
        : entry.settledAt,
    };

    return updatedRecord;
  });

  writeList(financialEntriesKey, updated);
  return updatedRecord;
}

export function deleteFinancialEntry(id: string) {
  const updated = listFinancialEntries().filter((entry) => entry.id !== id);
  writeList(financialEntriesKey, updated);
  return updated;
}

export function updateFinancialEntryStatus(id: string, status: StoredFinancialEntry["status"]) {
  const updated = listFinancialEntries().map((entry) => {
    if (entry.id !== id) return entry;

    const settledAt = status === "Pago" || status === "Recebido"
      ? new Date().toISOString().slice(0, 10)
      : entry.settledAt;

    return { ...entry, status, settledAt, updatedAt: new Date().toISOString() };
  });

  writeList(financialEntriesKey, updated);
  return updated.find((entry) => entry.id === id);
}

export function getFinancialEntryDisplayStatus(entry: StoredFinancialEntry): StoredFinancialEntry["status"] {
  if (isEntryOverdue(entry)) return "Vencido";
  return entry.status;
}

export function getFinancialEntriesByType(type: StoredFinancialEntry["type"]) {
  return listFinancialEntries().filter((entry) => entry.type === type);
}

export function getFinancialEntriesSummary(type: StoredFinancialEntry["type"]): FinancialEntrySummary {
  const entries = getFinancialEntriesByType(type);

  return entries.reduce<FinancialEntrySummary>((summary, entry) => {
    const value = currencyToNumber(entry.amount);
    const displayStatus = getFinancialEntryDisplayStatus(entry);

    if (displayStatus === "Cancelado") {
      summary.cancelled += value;
    } else {
      summary.total += value;
    }

    if (displayStatus === "Pendente") summary.pending += value;
    if (displayStatus === "Vencido") summary.overdue += value;
    if (displayStatus === "Pago" || displayStatus === "Recebido") summary.settled += value;

    summary.count += 1;
    return summary;
  }, { total: 0, pending: 0, settled: 0, overdue: 0, cancelled: 0, count: 0 });
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
export function calculateCommissionAmount(baseAmount: string, valueType: string, value: string) {
  const base = currencyToNumber(baseAmount);
  const commissionValue = valueType === "Percentual" ? Number(value.replace("%", "").replace(",", ".").trim()) : currencyToNumber(value);
  if (!Number.isFinite(commissionValue) || commissionValue <= 0) return 0;
  if (valueType === "Percentual") return base * (commissionValue / 100);
  return commissionValue;
}
export function getEmployeeCommissionRule(employee: StoredEmployee, targetType: string) {
  if (targetType === "Serviço" && employee.serviceCommissionType && employee.serviceCommissionType !== "Sem comissão") return { valueType: employee.serviceCommissionType, value: employee.serviceCommissionValue ?? "" };
  if (targetType === "Produto/peça" && employee.partCommissionType && employee.partCommissionType !== "Sem comissão") return { valueType: employee.partCommissionType, value: employee.partCommissionValue ?? "" };
  if (targetType === "Lavagem" && employee.washCommissionType && employee.washCommissionType !== "Sem comissão") return { valueType: employee.washCommissionType, value: employee.washCommissionValue ?? "" };
  return undefined;
}

export function getDashboardStats() {
  const workOrders = listWorkOrders();
  const products = listProducts();
  return {
    customers: listCustomers().length,
    vehicles: listVehicles().length,
    suppliers: listSuppliers().length,
    employees: listEmployees().length,
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
