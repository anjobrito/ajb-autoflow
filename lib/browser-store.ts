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
};

export type StoredWorkOrder = {
  id: string;
  code: string;
  customer: string;
  vehicle: string;
  service: string;
  product: string;
  status: string;
  total: string;
  notes: string;
};

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

export function listCustomers() {
  return readList<StoredCustomer>("aib-autoflow-customers");
}

export function saveCustomer(customer: Omit<StoredCustomer, "id">) {
  const customers = listCustomers();
  const record = { ...customer, id: crypto.randomUUID() };
  writeList("aib-autoflow-customers", [record, ...customers]);
  return record;
}

export function listVehicles() {
  return readList<StoredVehicle>("aib-autoflow-vehicles");
}

export function saveVehicle(vehicle: Omit<StoredVehicle, "id">) {
  const vehicles = listVehicles();
  const record = { ...vehicle, id: crypto.randomUUID() };
  writeList("aib-autoflow-vehicles", [record, ...vehicles]);
  return record;
}

export function listWorkOrders() {
  return readList<StoredWorkOrder>("aib-autoflow-work-orders");
}

export function saveWorkOrder(order: Omit<StoredWorkOrder, "id" | "code">) {
  const orders = listWorkOrders();
  const nextNumber = 2000 + orders.length + 1;
  const record = { ...order, id: `os-${nextNumber}`, code: `OS-${nextNumber}` };
  writeList("aib-autoflow-work-orders", [record, ...orders]);
  return record;
}
