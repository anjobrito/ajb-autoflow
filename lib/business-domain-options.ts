import type { BusinessProfile } from "@/lib/business-profiles";

type DomainItem = {
  name: string;
  category?: string;
};

export type DomainProductOption = {
  id: string;
  name: string;
  category: string;
  supplier: string;
  stock: string;
  minStock: string;
  costPrice: string;
  price: string;
};

export type DomainServiceOption = {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: string;
  status: string;
};

export type OperationalFormLabels = {
  serviceLabel: string;
  productLabel: string;
  quantityLabel: string;
  productSummaryLabel: string;
  productCostSummaryLabel: string;
  serviceSummaryLabel: string;
  responsibleLabel: string;
};

const productKeywordsByOperationMode: Record<BusinessProfile["operationMode"], string[]> = {
  MULTI_OPERATION: [],
  WORKSHOP_SERVICE: ["óleo", "oleo", "filtro", "freio", "pastilha", "disco", "correia", "bateria", "vela", "amortecedor", "lubrificante", "suspensão", "suspensao", "peça", "peca"],
  WASH_SERVICE: ["shampoo", "cera", "pretinho", "vidro", "limpa", "desengraxante", "toalha", "secagem", "lava", "lavagem", "aspiração", "aspiracao"],
  DETAILING_SERVICE: ["shampoo", "cera", "polidor", "polimento", "vitrificador", "vitrificação", "vitrificacao", "cristalização", "cristalizacao", "clay", "boina", "composto", "corte", "descontaminante", "microfibra", "couro", "higienização", "higienizacao", "estética", "estetica"],
  PARKING_FLOW: ["ticket", "cartão", "cartao", "mensalista", "controle", "acesso", "etiqueta", "cancela", "pátio", "patio", "estacionamento"],
  VEHICLE_SALES: ["laudo", "cautelar", "documentação", "documentacao", "despachante", "preparação", "preparacao", "entrega", "placa", "vistoria"],
  PARTS_SALES: ["peça", "peca", "autopeça", "autopeca", "filtro", "óleo", "oleo", "lubrificante", "acessório", "acessorio", "elétrico", "eletrico", "ferramenta", "freio", "bateria", "correia"],
};

const serviceKeywordsByOperationMode: Record<BusinessProfile["operationMode"], string[]> = {
  MULTI_OPERATION: [],
  WORKSHOP_SERVICE: ["troca", "óleo", "oleo", "revisão", "revisao", "freio", "suspensão", "suspensao", "diagnóstico", "diagnostico", "alinhamento", "balanceamento", "manutenção", "manutencao"],
  WASH_SERVICE: ["lavagem", "lava", "aspiração", "aspiracao", "higienização", "higienizacao", "limpeza", "enceramento"],
  DETAILING_SERVICE: ["polimento", "vitrificação", "vitrificacao", "cristalização", "cristalizacao", "higienização", "higienizacao", "detalhamento", "estética", "estetica", "revitalização", "revitalizacao", "farol"],
  PARKING_FLOW: ["diária", "diaria", "mensalidade", "avulso", "permanência", "permanencia", "estacionamento", "convênio", "convenio"],
  VEHICLE_SALES: ["preparação", "preparacao", "venda", "laudo", "cautelar", "documentação", "documentacao", "despachante", "vistoria", "entrega", "financiamento"],
  PARTS_SALES: ["pedido", "venda", "separação", "separacao", "entrega", "orçamento", "orcamento", "faturamento"],
};

const domainProductsByOperationMode: Record<BusinessProfile["operationMode"], DomainProductOption[]> = {
  MULTI_OPERATION: [],
  WORKSHOP_SERVICE: [
    { id: "domain-workshop-oil", name: "Óleo 5W30 Sintético", category: "Lubrificante", supplier: "Fornecedor demo", stock: "24", minStock: "6", costPrice: "R$ 30,00", price: "R$ 42,90" },
    { id: "domain-workshop-filter", name: "Filtro de óleo", category: "Filtros", supplier: "Fornecedor demo", stock: "12", minStock: "10", costPrice: "R$ 18,00", price: "R$ 28,00" },
    { id: "domain-workshop-pad", name: "Pastilha de freio dianteira", category: "Freios", supplier: "Fornecedor demo", stock: "4", minStock: "5", costPrice: "R$ 120,00", price: "R$ 189,90" },
  ],
  WASH_SERVICE: [
    { id: "domain-wash-shampoo", name: "Shampoo automotivo", category: "Lava-jato", supplier: "Fornecedor demo", stock: "9", minStock: "3", costPrice: "R$ 20,00", price: "R$ 34,90" },
    { id: "domain-wash-wax", name: "Cera líquida", category: "Lava-jato", supplier: "Fornecedor demo", stock: "7", minStock: "2", costPrice: "R$ 24,00", price: "R$ 45,00" },
    { id: "domain-wash-glass", name: "Limpa vidros", category: "Lava-jato", supplier: "Fornecedor demo", stock: "10", minStock: "4", costPrice: "R$ 12,00", price: "R$ 24,00" },
  ],
  DETAILING_SERVICE: [
    { id: "domain-detail-polish", name: "Composto polidor", category: "Estética", supplier: "Fornecedor demo", stock: "6", minStock: "2", costPrice: "R$ 55,00", price: "R$ 89,00" },
    { id: "domain-detail-vitrifier", name: "Vitrificador de pintura", category: "Estética", supplier: "Fornecedor demo", stock: "3", minStock: "1", costPrice: "R$ 180,00", price: "R$ 320,00" },
    { id: "domain-detail-microfiber", name: "Kit microfibra premium", category: "Estética", supplier: "Fornecedor demo", stock: "12", minStock: "4", costPrice: "R$ 25,00", price: "R$ 49,00" },
  ],
  PARKING_FLOW: [
    { id: "domain-parking-ticket", name: "Ticket de permanência", category: "Estacionamento", supplier: "Fornecedor demo", stock: "100", minStock: "20", costPrice: "R$ 0,50", price: "R$ 2,00" },
    { id: "domain-parking-card", name: "Cartão mensalista", category: "Estacionamento", supplier: "Fornecedor demo", stock: "40", minStock: "10", costPrice: "R$ 3,00", price: "R$ 10,00" },
  ],
  VEHICLE_SALES: [
    { id: "domain-sales-report", name: "Laudo cautelar", category: "Revenda", supplier: "Fornecedor demo", stock: "1", minStock: "1", costPrice: "R$ 180,00", price: "R$ 280,00" },
    { id: "domain-sales-doc", name: "Despachante / documentação", category: "Revenda", supplier: "Fornecedor demo", stock: "1", minStock: "1", costPrice: "R$ 350,00", price: "R$ 550,00" },
    { id: "domain-sales-delivery", name: "Preparação para entrega", category: "Revenda", supplier: "Fornecedor demo", stock: "1", minStock: "1", costPrice: "R$ 220,00", price: "R$ 390,00" },
  ],
  PARTS_SALES: [
    { id: "domain-parts-filter", name: "Filtro de óleo", category: "Filtros", supplier: "Fornecedor demo", stock: "12", minStock: "10", costPrice: "R$ 18,00", price: "R$ 28,00" },
    { id: "domain-parts-battery", name: "Bateria 60Ah", category: "Elétrica", supplier: "Fornecedor demo", stock: "5", minStock: "2", costPrice: "R$ 280,00", price: "R$ 420,00" },
    { id: "domain-parts-pad", name: "Pastilha de freio dianteira", category: "Freios", supplier: "Fornecedor demo", stock: "4", minStock: "5", costPrice: "R$ 120,00", price: "R$ 189,90" },
  ],
};

const domainServicesByOperationMode: Record<BusinessProfile["operationMode"], DomainServiceOption[]> = {
  MULTI_OPERATION: [],
  WORKSHOP_SERVICE: [
    { id: "domain-service-oil", name: "Troca de óleo", category: "Manutenção preventiva", duration: "45 min", price: "R$ 80,00", status: "Ativo" },
    { id: "domain-service-brake", name: "Revisão de freio", category: "Freios", duration: "90 min", price: "R$ 180,00", status: "Ativo" },
  ],
  WASH_SERVICE: [
    { id: "domain-service-wash", name: "Lavagem completa", category: "Lava-jato", duration: "90 min", price: "R$ 70,00", status: "Ativo" },
    { id: "domain-service-technical-wash", name: "Lavagem técnica", category: "Lava-jato", duration: "120 min", price: "R$ 140,00", status: "Ativo" },
  ],
  DETAILING_SERVICE: [
    { id: "domain-service-polish", name: "Polimento técnico", category: "Estética", duration: "240 min", price: "R$ 480,00", status: "Ativo" },
    { id: "domain-service-vitrification", name: "Vitrificação de pintura", category: "Estética", duration: "480 min", price: "R$ 1.200,00", status: "Ativo" },
    { id: "domain-service-interior", name: "Higienização interna", category: "Estética", duration: "180 min", price: "R$ 280,00", status: "Ativo" },
  ],
  PARKING_FLOW: [
    { id: "domain-service-daily", name: "Diária avulsa", category: "Estacionamento", duration: "1 dia", price: "R$ 25,00", status: "Ativo" },
    { id: "domain-service-monthly", name: "Mensalidade", category: "Estacionamento", duration: "30 dias", price: "R$ 220,00", status: "Ativo" },
  ],
  VEHICLE_SALES: [
    { id: "domain-service-sale-prep", name: "Preparação para venda", category: "Revenda", duration: "1 dia", price: "R$ 390,00", status: "Ativo" },
    { id: "domain-service-sale-report", name: "Laudo cautelar", category: "Revenda", duration: "2 h", price: "R$ 280,00", status: "Ativo" },
    { id: "domain-service-sale-doc", name: "Documentação de venda", category: "Revenda", duration: "1 dia", price: "R$ 550,00", status: "Ativo" },
    { id: "domain-service-sale-financing", name: "Acompanhamento de financiamento", category: "Revenda", duration: "1 dia", price: "R$ 300,00", status: "Ativo" },
  ],
  PARTS_SALES: [
    { id: "domain-service-parts-order", name: "Pedido de venda", category: "Autopeças", duration: "30 min", price: "R$ 0,00", status: "Ativo" },
    { id: "domain-service-parts-delivery", name: "Separação e entrega", category: "Autopeças", duration: "60 min", price: "R$ 30,00", status: "Ativo" },
  ],
};

const formLabelsByOperationMode: Record<BusinessProfile["operationMode"], OperationalFormLabels> = {
  MULTI_OPERATION: { serviceLabel: "Serviço / etapa", productLabel: "Item operacional", quantityLabel: "Quantidade", productSummaryLabel: "Itens", productCostSummaryLabel: "Custo dos itens", serviceSummaryLabel: "Serviços", responsibleLabel: "Responsável" },
  WORKSHOP_SERVICE: { serviceLabel: "Serviço", productLabel: "Produto / peça", quantityLabel: "Quantidade da peça", productSummaryLabel: "Peças", productCostSummaryLabel: "Custo das peças", serviceSummaryLabel: "Serviços", responsibleLabel: "Responsável" },
  WASH_SERVICE: { serviceLabel: "Atendimento", productLabel: "Produto de lavagem", quantityLabel: "Quantidade", productSummaryLabel: "Produtos", productCostSummaryLabel: "Custo dos produtos", serviceSummaryLabel: "Serviços", responsibleLabel: "Responsável" },
  DETAILING_SERVICE: { serviceLabel: "Serviço estético", productLabel: "Produto estético", quantityLabel: "Quantidade", productSummaryLabel: "Produtos", productCostSummaryLabel: "Custo dos produtos", serviceSummaryLabel: "Serviços", responsibleLabel: "Responsável" },
  PARKING_FLOW: { serviceLabel: "Tipo de permanência", productLabel: "Item operacional", quantityLabel: "Quantidade", productSummaryLabel: "Itens", productCostSummaryLabel: "Custo dos itens", serviceSummaryLabel: "Cobrança", responsibleLabel: "Responsável" },
  VEHICLE_SALES: { serviceLabel: "Etapa / processo", productLabel: "Custo vinculado", quantityLabel: "Quantidade", productSummaryLabel: "Custos vinculados", productCostSummaryLabel: "Custo operacional", serviceSummaryLabel: "Etapa", responsibleLabel: "Vendedor" },
  PARTS_SALES: { serviceLabel: "Tipo de pedido", productLabel: "Produto / peça", quantityLabel: "Quantidade da peça", productSummaryLabel: "Produtos", productCostSummaryLabel: "Custo dos produtos", serviceSummaryLabel: "Pedido", responsibleLabel: "Responsável" },
};

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function matchesKeywords(item: DomainItem, keywords: string[]) {
  if (!keywords.length) return true;
  const target = normalize(`${item.name} ${item.category ?? ""}`);
  return keywords.some((keyword) => target.includes(normalize(keyword)));
}

function mergeByName<T extends DomainItem>(primary: T[], fallback: T[]) {
  const names = new Set(primary.map((item) => normalize(item.name)));
  return [...primary, ...fallback.filter((item) => !names.has(normalize(item.name)))] as T[];
}

function filterByKeywords<T extends DomainItem>(items: T[], keywords: string[]) {
  if (!keywords.length) return items;
  return items.filter((item) => matchesKeywords(item, keywords));
}

export function filterProductsByBusinessProfile<T extends DomainItem>(items: T[], profile: BusinessProfile) {
  const domainItems = domainProductsByOperationMode[profile.operationMode] as unknown as T[];
  return mergeByName(domainItems, filterByKeywords(items, productKeywordsByOperationMode[profile.operationMode]));
}

export function filterServicesByBusinessProfile<T extends DomainItem>(items: T[], profile: BusinessProfile) {
  const domainItems = domainServicesByOperationMode[profile.operationMode] as unknown as T[];
  return mergeByName(domainItems, filterByKeywords(items, serviceKeywordsByOperationMode[profile.operationMode]));
}

export function getOperationalFormLabels(profile: BusinessProfile) {
  return formLabelsByOperationMode[profile.operationMode];
}
