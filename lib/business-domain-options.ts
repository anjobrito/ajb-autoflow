import type { BusinessProfile } from "@/lib/business-profiles";

type DomainItem = {
  name: string;
  category?: string;
};

const productKeywordsByOperationMode: Record<BusinessProfile["operationMode"], string[]> = {
  MULTI_OPERATION: [],
  WORKSHOP_SERVICE: ["óleo", "oleo", "filtro", "freio", "pastilha", "disco", "correia", "bateria", "vela", "amortecedor", "lubrificante", "suspensão", "suspensao", "peça", "peca"],
  WASH_SERVICE: ["shampoo", "cera", "pretinho", "vidro", "limpa", "desengraxante", "toalha", "secagem", "lava", "lavagem", "aspiração", "aspiracao"],
  DETAILING_SERVICE: ["shampoo", "cera", "polidor", "polimento", "vitrificador", "vitrificação", "vitrificacao", "cristalização", "cristalizacao", "clay", "boina", "composto", "corte", "descontaminante", "microfibra", "couro", "higienização", "higienizacao", "estética", "estetica"],
  PARKING_FLOW: ["ticket", "cartão", "cartao", "mensalista", "controle", "acesso", "etiqueta", "cancela", "pátio", "patio", "estacionamento"],
  VEHICLE_SALES: ["laudo", "cautelar", "documentação", "documentacao", "despachante", "preparação", "preparacao", "higienização", "higienizacao", "polimento", "entrega", "placa", "vistoria"],
  PARTS_SALES: ["peça", "peca", "autopeça", "autopeca", "filtro", "óleo", "oleo", "lubrificante", "acessório", "acessorio", "elétrico", "eletrico", "ferramenta", "freio", "bateria", "correia"],
};

const serviceKeywordsByOperationMode: Record<BusinessProfile["operationMode"], string[]> = {
  MULTI_OPERATION: [],
  WORKSHOP_SERVICE: ["troca", "óleo", "oleo", "revisão", "revisao", "freio", "suspensão", "suspensao", "diagnóstico", "diagnostico", "alinhamento", "balanceamento", "manutenção", "manutencao"],
  WASH_SERVICE: ["lavagem", "lava", "aspiração", "aspiracao", "higienização", "higienizacao", "limpeza", "enceramento"],
  DETAILING_SERVICE: ["polimento", "vitrificação", "vitrificacao", "cristalização", "cristalizacao", "higienização", "higienizacao", "detalhamento", "estética", "estetica", "revitalização", "revitalizacao", "farol"],
  PARKING_FLOW: ["diária", "diaria", "mensalidade", "avulso", "permanência", "permanencia", "estacionamento", "convênio", "convenio"],
  VEHICLE_SALES: ["preparação", "preparacao", "venda", "laudo", "cautelar", "documentação", "documentacao", "despachante", "vistoria", "entrega", "higienização", "higienizacao"],
  PARTS_SALES: ["pedido", "venda", "separação", "separacao", "entrega", "orçamento", "orcamento", "faturamento"],
};

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function matchesKeywords(item: DomainItem, keywords: string[]) {
  if (!keywords.length) return true;
  const target = normalize(`${item.name} ${item.category ?? ""}`);
  return keywords.some((keyword) => target.includes(normalize(keyword)));
}

function filterByKeywords<T extends DomainItem>(items: T[], keywords: string[]) {
  const filtered = items.filter((item) => matchesKeywords(item, keywords));
  return filtered.length > 0 ? filtered : items;
}

export function filterProductsByBusinessProfile<T extends DomainItem>(items: T[], profile: BusinessProfile) {
  return filterByKeywords(items, productKeywordsByOperationMode[profile.operationMode]);
}

export function filterServicesByBusinessProfile<T extends DomainItem>(items: T[], profile: BusinessProfile) {
  return filterByKeywords(items, serviceKeywordsByOperationMode[profile.operationMode]);
}
