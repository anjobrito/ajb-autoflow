import type { StoredWorkOrder } from "@/lib/browser-store";
import type { BusinessProfile } from "@/lib/business-types";

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function containsAny(target: string, keywords: string[]) {
  const normalizedTarget = normalize(target);
  return keywords.some((keyword) => normalizedTarget.includes(normalize(keyword)));
}

function workOrderText(order: StoredWorkOrder) {
  return [order.code, order.service, order.product, order.status, order.notes, order.partsTotal, order.servicesTotal].join(" ");
}

const profileKeywords: Record<BusinessProfile["id"], string[]> = {
  COMPLETO: [],
  OFICINA: ["troca de oleo", "troca de óleo", "oleo", "óleo", "filtro", "freio", "pastilha", "suspensao", "suspensão", "diagnostico", "diagnóstico", "revisao", "revisão", "peca", "peça", "aguardando peca", "aguardando peça"],
  LAVA_JATO: ["lavagem", "lava", "aspiracao", "aspiração", "acabamento", "shampoo", "cera", "secagem", "pronto", "entregue"],
  ESTETICA: ["estetica", "estética", "polimento", "vitrificacao", "vitrificação", "cristalizacao", "cristalização", "higienizacao", "higienização", "couro", "farol", "cura", "secagem", "revisao final", "revisão final"],
  CENTRO_AUTOMOTIVO: ["diagnostico", "diagnóstico", "revisao", "revisão", "servico", "serviço", "peca", "peça", "controle de qualidade", "lavagem", "polimento"],
  ESTACIONAMENTO: ["diaria", "diária", "mensalista", "mensalidade", "estacionado", "permanencia", "permanência", "pagamento pendente", "mov-", "ticket"],
  REVENDEDORA: ["preparacao", "preparação", "venda", "negociacao", "negociação", "documentacao", "documentação", "gravame", "financiamento", "laudo", "cautelar", "despachante", "pv-"],
  AUTOPECAS: ["pedido", "balcao", "balcão", "separacao", "separação", "faturado", "entrega local", "bateria", "autopeca", "autopeça", "ped-"],
};

const incompatibleKeywords: Record<BusinessProfile["id"], string[]> = {
  COMPLETO: [],
  OFICINA: [],
  LAVA_JATO: ["troca de oleo", "troca de óleo", "freio", "pastilha", "suspensao", "suspensão", "aguardando peca", "aguardando peça", "gravame", "documentacao", "documentação"],
  ESTETICA: ["troca de oleo", "troca de óleo", "freio", "pastilha", "suspensao", "suspensão", "aguardando peca", "aguardando peça", "gravame", "mensalista", "diaria", "diária"],
  CENTRO_AUTOMOTIVO: [],
  ESTACIONAMENTO: ["troca de oleo", "troca de óleo", "freio", "pastilha", "polimento", "vitrificacao", "vitrificação", "gravame", "laudo"],
  REVENDEDORA: ["troca de oleo", "troca de óleo", "freio", "pastilha", "suspensao", "suspensão", "aguardando peca", "aguardando peça", "lavagem completa"],
  AUTOPECAS: ["lavagem", "polimento", "vitrificacao", "vitrificação", "gravame", "mensalista", "diaria", "diária"],
};

export function isWorkOrderCompatibleWithBusinessProfile(order: StoredWorkOrder, profile: BusinessProfile) {
  if (profile.id === "COMPLETO") return true;

  const text = workOrderText(order);
  if (containsAny(text, incompatibleKeywords[profile.id])) return false;

  const keywords = profileKeywords[profile.id];
  if (!keywords.length) return true;

  return containsAny(text, keywords);
}

export function filterWorkOrdersByBusinessProfile(orders: StoredWorkOrder[], profile: BusinessProfile) {
  return orders.filter((order) => isWorkOrderCompatibleWithBusinessProfile(order, profile));
}
