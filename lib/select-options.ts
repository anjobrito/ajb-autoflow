export const businessTypes = [
  "Completo / Multioperação",
  "Oficina mecânica",
  "Lava-jato",
  "Estética automotiva",
  "Autopeças",
  "Centro automotivo",
  "Estacionamento",
  "Revendedora / Garagem",
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

export const vehicleYears = [
  "2027", "2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990", "Outro",
] as const;

export const financingInstitutions = [
  "Banco do Brasil",
  "Bradesco Financiamentos",
  "Caixa Econômica Federal",
  "BV Financeira",
  "Banco Pan",
  "Santander Financiamentos",
  "Itaú Financiamentos",
  "Safra Financeira",
  "Daycoval",
  "Omni Financeira",
  "Creditas",
  "Porto Bank",
  "Sicoob",
  "Sicredi",
  "C6 Bank",
  "Banco Inter",
  "Banco BMG",
  "Banco Volkswagen",
  "Banco Toyota",
  "Banco Honda",
  "Banco Mercedes-Benz",
  "Outra",
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
export const commissionStatuses = ["Ativa", "Inativa"] as const;

export const financialEntryTypes = ["Pagar", "Receber"] as const;
export const accountsPayableCategories = [
  "Peças e produtos",
  "Serviços terceirizados",
  "Aluguel",
  "Salários",
  "Comissões",
  "Impostos e taxas",
  "Energia elétrica",
  "Água",
  "Internet e telefone",
  "Manutenção interna",
  "Marketing",
  "Outro",
] as const;
export const accountsReceivableCategories = [
  "Ordem de serviço",
  "Venda de serviço",
  "Venda de peça/produto",
  "Lavagem",
  "Estética automotiva",
  "Contrato mensal",
  "Reembolso",
  "Outro",
] as const;
export const financialEntryCategories = [
  ...accountsPayableCategories,
  ...accountsReceivableCategories,
] as const;
export const payableStatuses = ["Pendente", "Pago", "Vencido", "Cancelado"] as const;
export const receivableStatuses = ["Pendente", "Recebido", "Vencido", "Cancelado"] as const;
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


export const employeeCommissionTypes = [
  "Sem comissão",
  "Percentual",
  "Valor fixo",
] as const;