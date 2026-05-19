export type BusinessProfileId =
  | "COMPLETO"
  | "OFICINA"
  | "LAVA_JATO"
  | "ESTETICA"
  | "CENTRO_AUTOMOTIVO"
  | "ESTACIONAMENTO"
  | "REVENDEDORA"
  | "AUTOPECAS";

export type OperationMode =
  | "MULTI_OPERATION"
  | "WORKSHOP_SERVICE"
  | "WASH_SERVICE"
  | "DETAILING_SERVICE"
  | "PARKING_FLOW"
  | "VEHICLE_SALES"
  | "PARTS_SALES";

export type BusinessProfile = {
  id: BusinessProfileId;
  label: string;
  description: string;
  operationMode: OperationMode;
  operationLabel: string;
  operationPluralLabel: string;
  kanbanLabel: string;
  kanbanStatuses: string[];
  dashboardCards: string[];
  modules: string[];
  menuKeys: string[];
};

export const businessProfiles: BusinessProfile[] = [
  {
    id: "COMPLETO",
    label: "Completo / Multioperação",
    description: "Exibe todos os módulos para empresas que atuam em várias frentes ou estão avaliando o sistema completo.",
    operationMode: "MULTI_OPERATION",
    operationLabel: "Operação",
    operationPluralLabel: "Operações",
    kanbanLabel: "Fluxo operacional",
    kanbanStatuses: ["Entrada", "Em atendimento", "Aguardando", "Pronto", "Entregue", "Finalizado"],
    dashboardCards: ["Receita do período", "Operações abertas", "Pendências", "Clientes ativos", "Veículos cadastrados", "Resultado financeiro"],
    modules: ["Dashboard", "Operação", "Cadastros", "Financeiro", "Revenda", "Sistema"],
    menuKeys: ["dashboard", "lembretes", "ordens", "patio", "veiculos", "historico", "clientes", "fornecedores", "funcionarios", "estoque", "servicos", "financeiro", "contas-pagar", "contas-receber", "comissoes", "financiamentos-gravames", "empresa"],
  },
  {
    id: "OFICINA",
    label: "Oficina mecânica",
    description: "Foco em ordens de serviço, veículos, histórico, serviços, estoque e controle financeiro da oficina.",
    operationMode: "WORKSHOP_SERVICE",
    operationLabel: "Ordem de serviço",
    operationPluralLabel: "Ordens de serviço",
    kanbanLabel: "Kanban de oficina",
    kanbanStatuses: ["Aberta", "Em andamento", "Aguardando peça", "Controle de qualidade", "Pronta para retirada", "Entregue"],
    dashboardCards: ["OS abertas", "OS em andamento", "Faturamento de serviços", "Peças consumidas", "Lucro estimado", "Veículos aguardando retirada"],
    modules: ["Dashboard", "Clientes", "Veículos", "Ordens", "Histórico", "Estoque", "Serviços", "Financeiro", "Lembretes"],
    menuKeys: ["dashboard", "lembretes", "ordens", "patio", "veiculos", "historico", "clientes", "fornecedores", "funcionarios", "estoque", "servicos", "financeiro", "contas-pagar", "contas-receber", "comissoes", "empresa"],
  },
  {
    id: "LAVA_JATO",
    label: "Lava-jato",
    description: "Foco em clientes recorrentes, veículos, serviços de lavagem, ordens simples, recebimentos e lembretes.",
    operationMode: "WASH_SERVICE",
    operationLabel: "Atendimento de lavagem",
    operationPluralLabel: "Atendimentos de lavagem",
    kanbanLabel: "Fluxo de lavagem",
    kanbanStatuses: ["Recebido", "Em lavagem", "Acabamento", "Pronto", "Entregue"],
    dashboardCards: ["Lavagens do dia", "Em lavagem", "Ticket médio", "Receita do dia", "Clientes recorrentes", "Retornos agendados"],
    modules: ["Dashboard", "Clientes", "Veículos", "Serviços", "Atendimentos", "Financeiro", "Contas a receber", "Lembretes"],
    menuKeys: ["dashboard", "lembretes", "ordens", "patio", "veiculos", "clientes", "funcionarios", "servicos", "financeiro", "contas-receber", "comissoes", "empresa"],
  },
  {
    id: "ESTETICA",
    label: "Estética automotiva",
    description: "Foco em serviços premium, detalhamento, clientes, veículos, agenda operacional e financeiro.",
    operationMode: "DETAILING_SERVICE",
    operationLabel: "Atendimento estético",
    operationPluralLabel: "Atendimentos estéticos",
    kanbanLabel: "Fluxo de estética",
    kanbanStatuses: ["Agendado", "Recebido", "Em execução", "Cura/secagem", "Revisão final", "Entregue"],
    dashboardCards: ["Serviços premium", "Agenda da semana", "Faturamento por pacote", "Veículos em execução", "Clientes recorrentes", "Pendências de entrega"],
    modules: ["Dashboard", "Clientes", "Veículos", "Serviços", "Atendimentos", "Financeiro", "Lembretes"],
    menuKeys: ["dashboard", "lembretes", "ordens", "patio", "veiculos", "clientes", "funcionarios", "servicos", "financeiro", "contas-pagar", "contas-receber", "comissoes", "empresa"],
  },
  {
    id: "CENTRO_AUTOMOTIVO",
    label: "Centro automotivo",
    description: "Perfil amplo para operação com oficina, serviços, estoque, pátio, funcionários, financeiro e comissões.",
    operationMode: "MULTI_OPERATION",
    operationLabel: "Ordem operacional",
    operationPluralLabel: "Ordens operacionais",
    kanbanLabel: "Kanban do centro automotivo",
    kanbanStatuses: ["Aberta", "Diagnóstico", "Em execução", "Aguardando peça", "Controle de qualidade", "Entregue"],
    dashboardCards: ["Ordens abertas", "Receita total", "Estoque crítico", "Comissões pendentes", "Margem estimada", "Veículos no pátio"],
    modules: ["Dashboard", "Operação", "Cadastros", "Estoque", "Serviços", "Financeiro", "Comissões"],
    menuKeys: ["dashboard", "lembretes", "ordens", "patio", "veiculos", "historico", "clientes", "fornecedores", "funcionarios", "estoque", "servicos", "financeiro", "contas-pagar", "contas-receber", "comissoes", "empresa"],
  },
  {
    id: "ESTACIONAMENTO",
    label: "Estacionamento",
    description: "Foco em pátio, veículos, clientes, contratos/recebimentos, lembretes e visão operacional simples.",
    operationMode: "PARKING_FLOW",
    operationLabel: "Movimentação de pátio",
    operationPluralLabel: "Movimentações de pátio",
    kanbanLabel: "Fluxo de permanência",
    kanbanStatuses: ["Entrada", "Estacionado", "Mensalista", "Pagamento pendente", "Saída autorizada", "Finalizado"],
    dashboardCards: ["Veículos no pátio", "Vagas ocupadas", "Mensalistas", "Entradas do dia", "Saídas do dia", "Recebimentos pendentes"],
    modules: ["Dashboard", "Pátio", "Clientes", "Veículos", "Financeiro", "Contas a receber", "Lembretes"],
    menuKeys: ["dashboard", "lembretes", "patio", "veiculos", "clientes", "financeiro", "contas-receber", "empresa"],
  },
  {
    id: "REVENDEDORA",
    label: "Revendedora / Garagem",
    description: "Foco em pátio, veículos, clientes, vendedores, financiamentos, gravames, contas e comissões.",
    operationMode: "VEHICLE_SALES",
    operationLabel: "Processo de venda",
    operationPluralLabel: "Processos de venda",
    kanbanLabel: "Esteira de venda",
    kanbanStatuses: ["Entrada no pátio", "Preparação", "Anunciado", "Em negociação", "Vendido", "Documentação"],
    dashboardCards: ["Veículos em estoque", "Valor em estoque", "Financiamentos pendentes", "Gravames pendentes", "Vendas do mês", "Margem estimada"],
    modules: ["Dashboard", "Pátio", "Clientes", "Veículos", "Funcionários", "Financiamentos e Gravames", "Financeiro", "Comissões"],
    menuKeys: ["dashboard", "lembretes", "patio", "veiculos", "historico", "clientes", "funcionarios", "financeiro", "contas-pagar", "contas-receber", "comissoes", "financiamentos-gravames", "empresa"],
  },
  {
    id: "AUTOPECAS",
    label: "Autopeças",
    description: "Foco em produtos, fornecedores, estoque, vendas/recebimentos, contas a pagar e financeiro.",
    operationMode: "PARTS_SALES",
    operationLabel: "Pedido de venda",
    operationPluralLabel: "Pedidos de venda",
    kanbanLabel: "Fluxo de pedido",
    kanbanStatuses: ["Orçamento", "Separação", "Aguardando pagamento", "Faturado", "Entregue", "Cancelado"],
    dashboardCards: ["Produtos em estoque", "Estoque baixo", "Vendas do dia", "Contas a pagar", "Contas a receber", "Fornecedores ativos"],
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
