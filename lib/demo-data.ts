export const demoCompany = {
  name: "Oficina Demo AutoFlow",
  tradeName: "AutoFlow Garage",
  cnpj: "12.345.678/0001-90",
  city: "Araras",
  state: "SP",
  plan: "Start",
  status: "Trial ativo",
};

export const demoCustomers = [
  { id: "cli-001", name: "João Pereira", phone: "(19) 98888-1100", email: "joao@email.com", city: "Araras", state: "SP" },
  { id: "cli-002", name: "Maria Souza", phone: "(19) 97777-2200", email: "maria@email.com", city: "Limeira", state: "SP" },
  { id: "cli-003", name: "Carlos Lima", phone: "(19) 96666-3300", email: "carlos@email.com", city: "Rio Claro", state: "SP" },
  { id: "cli-004", name: "Ana Martins", phone: "(19) 95555-4400", email: "ana@email.com", city: "Piracicaba", state: "SP" },
];

export const demoVehicles = [
  { id: "vei-001", plate: "ABC1D23", model: "Honda Civic", customer: "João Pereira", mileage: "82.450 km", status: "Revisão em 30 dias" },
  { id: "vei-002", plate: "BRA2E44", model: "Fiat Argo", customer: "Maria Souza", mileage: "41.900 km", status: "Troca de óleo" },
  { id: "vei-003", plate: "CAR9F10", model: "VW Gol", customer: "Carlos Lima", mileage: "119.200 km", status: "Pronto para retirada" },
  { id: "vei-004", plate: "AIB7S20", model: "Chevrolet Onix", customer: "Ana Martins", mileage: "63.100 km", status: "Sem pendência" },
];

export const demoProducts = [
  { id: "pro-001", name: "Óleo 5W30 Sintético", category: "Lubrificante", stock: "24", minStock: "6", price: "R$ 42,90" },
  { id: "pro-002", name: "Filtro de óleo", category: "Filtros", stock: "12", minStock: "10", price: "R$ 28,00" },
  { id: "pro-003", name: "Pastilha de freio dianteira", category: "Freios", stock: "4", minStock: "5", price: "R$ 189,90" },
  { id: "pro-004", name: "Shampoo automotivo", category: "Lava-jato", stock: "9", minStock: "3", price: "R$ 34,90" },
];

export const demoServices = [
  { id: "ser-001", name: "Troca de óleo", category: "Manutenção preventiva", duration: "45 min", price: "R$ 80,00", status: "Ativo" },
  { id: "ser-002", name: "Alinhamento", category: "Suspensão", duration: "60 min", price: "R$ 120,00", status: "Ativo" },
  { id: "ser-003", name: "Lavagem completa", category: "Lava-jato", duration: "90 min", price: "R$ 70,00", status: "Ativo" },
  { id: "ser-004", name: "Higienização interna", category: "Estética", duration: "180 min", price: "R$ 280,00", status: "Ativo" },
];

export const demoWorkOrders = [
  { id: "os-1024", code: "OS-1024", customer: "João Pereira", vehicle: "Honda Civic", plate: "ABC1D23", service: "Troca de óleo", status: "Em andamento", total: "R$ 238,00" },
  { id: "os-1025", code: "OS-1025", customer: "Maria Souza", vehicle: "Fiat Argo", plate: "BRA2E44", service: "Freio dianteiro", status: "Aguardando peça", total: "R$ 640,00" },
  { id: "os-1026", code: "OS-1026", customer: "Carlos Lima", vehicle: "VW Gol", plate: "CAR9F10", service: "Lavagem completa", status: "Pronta para retirada", total: "R$ 70,00" },
  { id: "os-1027", code: "OS-1027", customer: "Ana Martins", vehicle: "Chevrolet Onix", plate: "AIB7S20", service: "Higienização", status: "Aberta", total: "R$ 280,00" },
];
