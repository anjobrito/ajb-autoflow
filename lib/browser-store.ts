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

export type StoredProduct = {
  id: string;
  name: string;
  category: string;
  stock: string;
  minStock: string;
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
  return readList<StoredCustomer>("ajb-autoflow-customers");
}

export function saveCustomer(customer: Omit<StoredCustomer, "id">) {
  const customers = listCustomers();
  const record = { ...customer, id: crypto.randomUUID() };
  writeList("ajb-autoflow-customers", [record, ...customers]);
  return record;
}

export function listVehicles() {
  return readList<StoredVehicle>("ajb-autoflow-vehicles");
}

export function saveVehicle(vehicle: Omit<StoredVehicle, "id">) {
  const vehicles = listVehicles();
  const record = { ...vehicle, id: crypto.randomUUID() };
  writeList("ajb-autoflow-vehicles", [record, ...vehicles]);
  return record;
}

export function listProducts() {
  return readList<StoredProduct>("ajb-autoflow-products");
}

export function saveProduct(product: Omit<StoredProduct, "id">) {
  const products = listProducts();
  const record = { ...product, id: crypto.randomUUID() };
  writeList("ajb-autoflow-products", [record, ...products]);
  return record;
}

export function listServices() {
  return readList<StoredService>("ajb-autoflow-services");
}

export function saveService(service: Omit<StoredService, "id">) {
  const services = listServices();
  const record = { ...service, id: crypto.randomUUID() };
  writeList("ajb-autoflow-services", [record, ...services]);
  return record;
}

export function listWorkOrders() {
  return readList<StoredWorkOrder>("ajb-autoflow-work-orders");
}

export function saveWorkOrder(order: Omit<StoredWorkOrder, "id" | "code">) {
  const orders = listWorkOrders();
  const nextNumber = 2000 + orders.length + 1;
  const record = { ...order, id: `os-${nextNumber}`, code: `OS-${nextNumber}` };
  writeList("ajb-autoflow-work-orders", [record, ...orders]);
  return record;
}

export function findWorkOrderById(id: string) {
  return listWorkOrders().find((order) => order.id === id);
}
