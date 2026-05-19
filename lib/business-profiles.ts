export type BusinessProfileId =
  | "COMPLETO"
  | "OFICINA"
  | "LAVA_JATO"
  | "ESTETICA"
  | "CENTRO_AUTOMOTIVO"
  | "ESTACIONAMENTO"
  | "REVENDEDORA"
  | "AUTOPECAS";

export type BusinessProfile = {
  id: BusinessProfileId;
  label: string;
  description: string;
  modules: string[];
  menuKeys: string[];
};

export const businessProfiles: BusinessProfile[] = [
  {
    id: "COMPLETO",
    label: "Completo / Multioperação",
    description: "Exibe todos os módulos para empresas que atuam em várias frentes ou estão avaliando o sistema completo.",
    modules: ["Dashboard", "Operação", "Cadastros", "Financeiro", "Revenda", "Sistema"],
    menuKeys: ["dashboard", "lembretes", "ordens", "patio", "veiculos", "historico", "clientes", "fornecedores", "funcionarios", "estoque", "servicos", "financeiro", "contas-pagar", "contas-receber", "comissoes", "financiamentos-gravames", "empresa"],
  },
  {
    id: "OFICINA",
    label: "Oficina mecânica",
    description: "Foco em ordens de serviço, veículos, histórico, serviços, estoque e controle financeiro da oficina.",
    modules: ["Dashboard", "Clientes", "Veículos", "Ordens", "Histórico", "Estoque", "Serviços", "Financeiro", "Lembretes"],
    menuKeys: ["dashboard", "lembretes", "ordens", "patio", "veiculos", "historico", "clientes", "fornecedores", "funcionarios", "estoque", "servicos", "financeiro", "contas-pagar", "contas-receber", "comissoes", "empresa"],
  },
  {
    id: "LAVA_JATO",
    label: "Lava-jato",
    description: "Foco em clientes recorrentes, veículos, serviços de lavagem, ordens simples, recebimentos e lembretes.",
    modules: ["Dashboard", "Clientes", "Veículos", "Serviços", "Ordens", "Financeiro", "Contas a receber", "Lembretes"],
    menuKeys: ["dashboard", "lembretes", "ordens", "patio", "veiculos", "clientes", "funcionarios", "servicos", "financeiro", "contas-receber", "comissoes", "empresa"],
  },
  {
    id: "ESTETICA",
    label: "Estética automotiva",
    description: "Foco em serviços premium, detalhamento, clientes, veículos, agenda operacional e financeiro.",
    modules: ["Dashboard", "Clientes", "Veículos", "Serviços", "Ordens", "Financeiro", "Lembretes"],
    menuKeys: ["dashboard", "lembretes", "ordens", "patio", "veiculos", "clientes", "funcionarios", "servicos", "financeiro", "contas-pagar", "contas-receber", "comissoes", "empresa"],
  },
  {
    id: "CENTRO_AUTOMOTIVO",
    label: "Centro automotivo",
    description: "Perfil amplo para operação com oficina, serviços, estoque, pátio, funcionários, financeiro e comissões.",
    modules: ["Dashboard", "Operação", "Cadastros", "Estoque", "Serviços", "Financeiro", "Comissões"],
    menuKeys: ["dashboard", "lembretes", "ordens", "patio", "veiculos", "historico", "clientes", "fornecedores", "funcionarios", "estoque", "servicos", "financeiro", "contas-pagar", "contas-receber", "comissoes", "empresa"],
  },
  {
    id: "ESTACIONAMENTO",
    label: "Estacionamento",
    description: "Foco em pátio, veículos, clientes, contratos/recebimentos, lembretes e visão operacional simples.",
    modules: ["Dashboard", "Pátio", "Clientes", "Veículos", "Financeiro", "Contas a receber", "Lembretes"],
    menuKeys: ["dashboard", "lembretes", "patio", "veiculos", "clientes", "financeiro", "contas-receber", "empresa"],
  },
  {
    id: "REVENDEDORA",
    label: "Revendedora / Garagem",
    description: "Foco em pátio, veículos, clientes, vendedores, financiamentos, gravames, contas e comissões.",
    modules: ["Dashboard", "Pátio", "Clientes", "Veículos", "Funcionários", "Financiamentos e Gravames", "Financeiro", "Comissões"],
    menuKeys: ["dashboard", "lembretes", "patio", "veiculos", "historico", "clientes", "funcionarios", "financeiro", "contas-pagar", "contas-receber", "comissoes", "financiamentos-gravames", "empresa"],
  },
  {
    id: "AUTOPECAS",
    label: "Autopeças",
    description: "Foco em produtos, fornecedores, estoque, vendas/recebimentos, contas a pagar e financeiro.",
    modules: ["Dashboard", "Clientes", "Fornecedores", "Estoque", "Financeiro", "Contas a pagar", "Contas a receber"],
    menuKeys: ["dashboard", "clientes", "fornecedores", "funcionarios", "estoque", "financeiro", "contas-pagar", "contas-receber", "empresa"],
  },
];

export const businessTypes = businessProfiles.map((profile) => profile.label) as [string, ...string[]];

export function getBusinessProfileByLabel(label?: string) {
  return businessProfiles.find((profile) => profile.label === label) ?? businessProfiles[0];
}

export function isMenuKeyAllowedForBusinessProfile(menuKey: string, businessType?: string) {
  const profile = getBusinessProfileByLabel(businessType);
  return profile.id === "COMPLETO" || profile.menuKeys.includes(menuKey);
}
