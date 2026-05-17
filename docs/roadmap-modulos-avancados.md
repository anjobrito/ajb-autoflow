# Roadmap de Módulos Avançados - AJB AutoFlow

Este documento organiza a evolução do **AJB AutoFlow by AJBSYSTEMS** como plataforma **SaaS multiempresa** para oficinas mecânicas, lava-jatos, estética automotiva, autopeças e centros automotivos.

A proposta do produto é evoluir de um MVP comercial funcional para uma solução operacional completa, com gestão de atendimento, pátio, estoque, histórico do veículo, financeiro, CRM, equipe, comissões e integrações futuras.

> Status pós-integração: a `main` já contém a base integrada do MVP com clientes, veículos com propulsão, fornecedores, produtos/estoque, serviços, ordens de serviço, pátio/Kanban, histórico do veículo, checklist/vistoria, lembretes, financeiro inicial, contas a pagar/receber, funcionários, comissões preparatórias, selects centralizados e documentação atualizada.

## Visão do Produto

O AJB AutoFlow deve deixar de ser apenas um controle de ordens de serviço e se consolidar como uma plataforma operacional, financeira e comercial para negócios automotivos.

A proposta central é:

> Controlar o fluxo do veículo, o estoque, a margem, o atendimento, o financeiro, a equipe e o retorno do cliente em uma solução SaaS simples, vendável e preparada para multiempresa.

---

## Fase 1 - MVP Comercial

Objetivo: permitir demonstração, venda piloto e validação com clientes reais.

### Já implementado / iniciado

- Landing page institucional do AJB AutoFlow.
- Página de planos.
- Página de demonstração guiada.
- Cadastro da empresa.
- Cadastros operacionais básicos:
  - Clientes.
  - Veículos.
  - Fornecedores.
  - Produtos, peças e insumos.
  - Serviços.
  - Funcionários.
- Ordens de serviço com status operacional.
- Cálculo de total da OS.
- Cálculo de margem estimada.
- Baixa básica de estoque ao salvar OS.
- Dashboard com indicadores básicos.
- Tela financeira inicial com resumo de receita, lucro, ticket médio e margem.
- Contas a pagar e contas a receber como módulo financeiro operacional complementar.
- Base de comissões por funcionário, serviço, produto/peça e lavagem.
- Aviso demo de veículo pronto.
- Lembretes operacionais com canais previstos para e-mail, WhatsApp futuro e SMS futuro.
- Checklist/vistoria de entrada vinculado à OS.
- Histórico do veículo por placa.
- Kanban/pátio com status da OS.
- Campo de propulsão do veículo, incluindo flex, gasolina, etanol, diesel, GNV, híbrido, híbrido plug-in e elétrico.
- Exibição da propulsão na listagem de veículos, detalhe da OS e histórico do veículo.
- Centralização de opções enumeráveis em `lib/select-options.ts`.
- Padronização inicial de campos enumeráveis como select/combobox.
- Persistência local via `localStorage` para o MVP.

### Próximas melhorias do MVP

- Revisar build TypeScript após a integração das branches.
- Ajustar mensagens vazias, validações leves e consistência visual onde necessário.
- Melhorar clareza do fluxo financeiro sem quebrar `getFinancialSummary`.
- Evoluir a experiência mobile do pátio.
- Preparar documentação comercial para venda piloto.

---

## Fase 2 - Gestão de Pátio e Fluxo de Trabalho

Objetivo: organizar espaço físico, tempo de equipe e estágio de cada veículo.

### Status atual

Parcialmente implementado no MVP.

Já existe base para:

- Tela de pátio/Kanban.
- Status operacionais de OS.
- Atualização de status.
- Marcação de início e finalização por status.
- Histórico por placa.
- Vistoria/checklist de entrada.
- Cadastro de veículos com propulsão.
- Cadastro de funcionários para futura atribuição de responsável.

### Evolução recomendada

- Tornar o Kanban mais operacional para uso diário.
- Melhorar visão de gargalos por etapa.
- Adicionar indicadores de tempo por etapa.
- Separar claramente visão gerencial desktop e visão operacional mobile.
- Evoluir atualização de status para fluxo de poucos cliques.
- Futuramente vincular responsável técnico/lavador à OS.

### Colunas operacionais recomendadas

- Aguardando triagem.
- Em manutenção/lavagem.
- Aguardando peça.
- Controle de qualidade.
- Pronto para entrega.
- Entregue.

### Informações relevantes no card

- Código da OS.
- Cliente.
- Placa.
- Veículo.
- Propulsão.
- Serviço principal.
- Responsável futuro.
- Horário de entrada.
- Status.

---

## Fase 3 - Oficina Mecânica

Objetivo: atender melhor oficina, centro automotivo e autopeças.

### Status atual

Base operacional já iniciada com cadastro de clientes, veículos, serviços, produtos, fornecedores, OS, estoque simples, margem estimada, histórico por placa e propulsão do veículo.

### Orçamentos Inteligentes

Pendente.

Evolução planejada:

- Criar orçamento antes da OS.
- Converter orçamento aprovado em OS.
- Adicionar serviços e peças com poucos cliques.
- Calcular mão de obra, peças, margem e total.
- Futuro: tabela de tempo padrão de reparo.

### Controle de Peças e Estoque

Parcialmente implementado.

Já existe:

- Cadastro de produto/peça/insumo.
- Estoque atual.
- Estoque mínimo.
- Custo e preço de venda.
- Fornecedor vinculado.
- Baixa básica de estoque ao salvar OS.

Próximos passos:

- Alerta visual mais forte de estoque mínimo.
- Histórico de movimentação de estoque.
- Entrada manual de estoque.
- Inventário e ajustes.
- Margem consolidada por peça e por OS.

### Histórico Clínico do Veículo

Parcialmente implementado.

Já existe consulta por placa com dados de OS, veículo e propulsão.

Próximos passos:

- Incluir garantias.
- Incluir recomendações futuras.
- Incluir quilometragem por atendimento de forma mais analítica.
- Futuro: consulta por chassi.

---

## Fase 4 - Lava-Jato e Estética Automotiva

Objetivo: atender negócios com agenda, fila, pacotes e recorrência.

### Status atual

Ainda pendente como módulo específico.

A base de serviços, pátio, status, OS, funcionários e comissões já permite demonstrar parte do fluxo, mas ainda não existe módulo dedicado de agenda, fila ou pacotes.

### Agendamento Online

Pendente.

Página pública para cliente final escolher:

- Dia.
- Horário.
- Tipo de lavagem/serviço.
- Veículo.
- Dados de contato.

### Grade de Horários

Pendente.

Controle por dia e horário:

- Agendado.
- Em atendimento.
- Finalizado.
- Cancelado.
- Não compareceu.

### Gestão de Fila

Pendente.

Tela simples para equipe visualizar prioridade:

- Próximo da vez.
- Agendados.
- Encaixes.
- Aguardando retirada.

### Pacotes e Assinaturas

Pendente.

Exemplos:

- 4 lavagens por mês.
- 2 lavagens completas por mês.
- Plano mensal com desconto.
- Controle de saldo de lavagens.

---

## Fase 5 - Financeiro e Faturamento

Objetivo: ajudar o dono a entender dinheiro, lucro, despesas, recebíveis e resultado operacional.

### Status atual

Parcialmente implementado.

Já existe:

- Tela financeira inicial baseada nas ordens de serviço.
- Resumo de receita, lucro estimado, ticket médio, margem e quantidade de OS.
- Módulo complementar de contas a pagar e receber em `/financeiro/contas`.
- Cadastro de lançamento financeiro.
- Tipo `StoredFinancialEntry` em `localStorage`.
- Funções `listFinancialEntries`, `saveFinancialEntry` e `updateFinancialEntryStatus`.
- Cards de resumo: a pagar, a receber, vencido e pago/recebido.
- Tabela de lançamentos.

Regras preservadas:

- A página `/financeiro` original não foi substituída.
- `getFinancialSummary` permanece baseado nas ordens de serviço.
- Contas a pagar/receber complementa o financeiro existente.

### Próximos passos financeiros

- Criar baixa de pagamento da OS.
- Criar PDV/check-out.
- Melhorar categorias financeiras conforme uso real.
- Criar relatórios por período.
- Futuramente consolidar receitas de OS com lançamentos financeiros.

### PDV / Check-out

Pendente.

Baixa de pagamento da OS.

Formas de pagamento:

- Pix.
- Cartão.
- Dinheiro.
- Misto.

### Fiscal

Fase futura, pois exige maior complexidade:

- NFS-e.
- NF-e.
- Certificado digital.
- Integração municipal/SEFAZ.
- Regras fiscais e tributárias.

Recomendação: deixar como módulo premium futuro.

---

## Fase 6 - Equipe, Funcionários e Comissões

Objetivo: preparar o AJB AutoFlow para controle de operação por responsável, produtividade e remuneração variável.

### Cadastro de Funcionários

Implementado no MVP.

Já existe:

- Rota `/funcionarios`.
- Rota `/funcionarios/novo`.
- Componente de listagem de funcionários.
- Componente de formulário de novo funcionário.
- Tipo `StoredEmployee`.
- Funções `listEmployees` e `saveEmployee`.
- Item Funcionários no menu lateral.
- Selects para cargo/função, tipo de vínculo e status.

Campos:

- Nome.
- CPF.
- Telefone.
- E-mail.
- Cargo/função.
- Tipo de vínculo.
- Status.

### Base de Comissões

Implementada como estrutura preparatória do MVP.

Já existe:

- Tipo `StoredCommission`.
- Funções `listCommissions` e `saveCommission`.
- Tela `/comissoes`.
- Tela `/comissoes/nova`.
- Selects para tipo/base/status de comissão.
- Vínculo com funcionário quando houver `StoredEmployee` cadastrado.

Tipos suportados:

- Serviço.
- Produto/peça.
- Lavagem.
- Percentual.
- Valor fixo.

Limite atual:

- O cálculo financeiro geral ainda não considera comissão automaticamente.
- `StoredWorkOrder` não foi alterado para cálculo de comissão.
- Integração de comissão na OS deve ser uma etapa futura e controlada.

---

## Fase 7 - CRM e Fidelização

Objetivo: trazer o cliente de volta automaticamente.

### Status atual

Base inicial de lembretes já implementada no storage local.

### Lembretes de Revisão

Já iniciado.

Exemplos:

- Troca de óleo em 6 meses.
- Revisão por quilometragem.
- Troca de filtros.
- Revisão de freios.
- Lavagem mensal.
- Higienização semestral.

Canais:

- E-mail no MVP.
- SMS futuro.
- WhatsApp oficial futuro.

### Programa de Fidelidade

Pendente.

Exemplos:

- A cada 10 lavagens, 1 grátis.
- Plano mensal de lavagem.
- Cashback interno.
- Pontos por serviço.

Campos importantes:

- Cliente.
- Tipo de benefício.
- Quantidade acumulada.
- Benefício disponível.
- Data de validade.

---

## Fase 8 - Plataforma SaaS Multiempresa

Objetivo: sair do MVP em `localStorage` e evoluir para plataforma comercial escalável.

### Status atual

O produto já está posicionado como SaaS multiempresa na comunicação comercial, mas a persistência do MVP permanece local.

### Próximos passos técnicos

- Manter `localStorage` enquanto o MVP estiver em validação rápida.
- Migrar posteriormente para Prisma + PostgreSQL.
- Criar modelo de empresa/tenant.
- Isolar dados por empresa.
- Implementar autenticação.
- Implementar controle de plano e assinatura.
- Integrar Resend para e-mails transacionais.
- Preparar trilha futura para WhatsApp oficial, SMS, Pix e módulos fiscais premium.

---

## Priorização Recomendada Pós-Integração

### Bloco imediato

1. Rodar/verificar build da `main` pós-integração.
2. Revisar imports, tipos e eventuais erros TypeScript.
3. Revisar navegação manual dos módulos já integrados.
4. Validar fluxos principais com `localStorage`.
5. Melhorar mensagens vazias e validações leves sem alterar regra de negócio.

### Segundo bloco

1. Melhorar pátio/Kanban com foco operacional.
2. Evoluir experiência mobile de pátio.
3. Melhorar checklist com fotos.
4. Melhorar lembretes automáticos.
5. Preparar notificação por e-mail com Resend.

### Terceiro bloco

1. Agendamento de lava-jato.
2. Fila/próximo da vez.
3. Pacotes e assinaturas.
4. PDV/check-out.
5. Histórico financeiro por cliente e por veículo.

### Quarto bloco

1. Migração de storage local para Prisma + PostgreSQL.
2. Autenticação e isolamento multiempresa.
3. Planos, limites e assinatura.
4. WhatsApp oficial.
5. Pix no checkout.
6. Integrações fiscais.

---

## Observação Estratégica

Para vender rápido, o AJB AutoFlow não deve prometer todos os módulos no início.

Mensagem comercial recomendada para o MVP:

> Controle sua oficina ou lava-jato pelo celular, acompanhe veículos em atendimento, veja margem das peças, organize ordens de serviço, controle contas a pagar/receber, cadastre sua equipe, prepare comissões e avise o cliente quando o veículo estiver pronto.

A estratégia correta é vender o MVP como assinatura inicial do **AJB AutoFlow by AJBSYSTEMS**, validar com clientes reais e evoluir os módulos conforme demanda de mercado.
