export const businessTypes = [
  "Oficina mecânica",
  "Lava-jato",
  "Estética automotiva",
  "Autopeças",
  "Centro automotivo",
] as const;

export const brazilianStates = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const;

export const commonCities = [
  "Araras",
  "Limeira",
  "Rio Claro",
  "Piracicaba",
  "Campinas",
  "São Paulo",
  "Ribeirão Preto",
  "Sorocaba",
  "Americana",
  "Outra",
] as const;

export const vehicleBrands = [
  "Agrale",
  "Aion",
  "Alfa Romeo",
  "Audi",
  "BMW",
  "BYD",
  "Caoa Chery",
  "Chevrolet",
  "Citroën",
  "Dacia",
  "Daewoo",
  "Daihatsu",
  "Dodge",
  "DS Automobiles",
  "Ferrari",
  "Fiat",
  "Ford",
  "Genesis",
  "GWM",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Isuzu",
  "Iveco",
  "JAC",
  "Jaguar",
  "Jeep",
  "Kia",
  "Land Rover",
  "Leapmotor",
  "Lexus",
  "Li Auto",
  "Lucid",
  "Lynk & Co",
  "Mazda",
  "Maserati",
  "Mercedes-Benz",
  "Mini",
  "Mitsubishi",
  "NIO",
  "Nissan",
  "Peugeot",
  "Polestar",
  "Porsche",
  "RAM",
  "Renault",
  "Rivian",
  "Samsung Motors",
  "Smart",
  "SsangYong",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
  "XPeng",
  "Zeekr",
  "Outra",
] as const;

export const vehiclePowertrains = [
  "Flex",
  "Gasolina",
  "Etanol",
  "Diesel",
  "GNV",
  "Híbrido",
  "Híbrido plug-in",
  "Elétrico",
] as const;

export const productCategories = [
  "Lubrificante",
  "Filtro",
  "Freio",
  "Suspensão",
  "Elétrica",
  "Pneu",
  "Limpeza automotiva",
  "Higienização",
  "Acessório",
  "Insumo",
  "Outro",
] as const;

export const serviceCategories = [
  "Manutenção preventiva",
  "Manutenção corretiva",
  "Troca de óleo",
  "Freios",
  "Suspensão",
  "Elétrica",
  "Lavagem",
  "Higienização",
  "Estética automotiva",
  "Diagnóstico",
  "Outro",
] as const;

export const serviceStatuses = ["Ativo", "Inativo"] as const;

export const workOrderStatuses = [
  "Aberta",
  "Em andamento",
  "Aguardando peça",
  "Controle de qualidade",
  "Pronta para retirada",
  "Entregue",
] as const;

export const newWorkOrderStatuses = [
  "Aberta",
  "Em andamento",
  "Aguardando peça",
  "Pronta para retirada",
] as const;

export const employeeRoles = [
  "Mecânico",
  "Eletricista automotivo",
  "Lavador",
  "Detailer",
  "Atendente",
  "Consultor técnico",
  "Estoquista",
  "Financeiro",
  "Gerente",
  "Outro",
] as const;

export const employeeEmploymentTypes = [
  "CLT",
  "PJ",
  "Autônomo",
  "Freelancer",
  "Estágio",
  "Temporário",
] as const;

export const employeeStatuses = ["Ativo", "Inativo", "Afastado"] as const;

export const commissionTargetTypes = ["Serviço", "Produto/peça", "Lavagem"] as const;
export const commissionValueTypes = ["Percentual", "Valor fixo"] as const;
export const commissionStatuses = ["Pendente", "Paga", "Cancelada"] as const;
export const employeeCommissionTypes = ["Percentual", "Valor fixo", "Sem comissão"] as const;

export const financialEntryTypes = ["Pagar", "Receber"] as const;
export const financialEntryCategories = [
  "Peças e produtos",
  "Serviços terceirizados",
  "Aluguel",
  "Salários",
  "Comissões",
  "Impostos e taxas",
  "Energia elétrica",
  "Água",
  "Internet e telefone",
  "Venda de serviço",
  "Venda de peça/produto",
  "Lavagem",
  "Outro",
] as const;
export const financialEntryStatuses = ["Pendente", "Pago", "Recebido", "Vencido", "Cancelado"] as const;
export const paymentMethods = ["Dinheiro", "Pix", "Cartão de débito", "Cartão de crédito", "Boleto", "Transferência", "Cheque", "Outro"] as const;

export const carwashReminderTypes = [
  "Lavagem mensal",
  "Lavagem completa",
  "Higienização interna",
  "Detalhamento",
] as const;

export const partsReminderTypes = [
  "Reposição de filtros",
  "Compra recorrente de óleo",
  "Pastilhas de freio",
  "Reposição de estoque",
] as const;

export const workshopReminderTypes = [
  "Troca de óleo",
  "Revisão preventiva",
  "Revisão de freios",
  "Troca de filtros",
] as const;

export const reminderChannels = ["E-mail", "WhatsApp futuro", "SMS futuro"] as const;
export const reminderStatuses = ["Pendente", "Enviado", "Cancelado"] as const;
export const fuelLevels = ["Reserva", "1/4", "1/2", "3/4", "Cheio"] as const;
