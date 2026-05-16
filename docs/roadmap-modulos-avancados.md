# Roadmap de Módulos Avançados - AJB AutoFlow

Este documento organiza a evolução do **AJB AutoFlow by AJBSYSTEMS** como plataforma **SaaS multiempresa** para oficinas mecânicas, lava-jatos, estética automotiva, autopeças e centros automotivos.

A proposta do produto é evoluir de um MVP comercial funcional para uma solução operacional completa, com gestão de atendimento, pátio, estoque, histórico do veículo, financeiro, CRM, comissões e integrações futuras.

## Visão do Produto

O AJB AutoFlow deve deixar de ser apenas um controle de ordens de serviço e se consolidar como uma plataforma operacional, financeira e comercial para negócios automotivos.

A proposta central é:

> Controlar o fluxo do veículo, o estoque, a margem, o atendimento, o financeiro e o retorno do cliente em uma solução SaaS simples, vendável e preparada para multiempresa.

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
- Ordens de serviço com status operacional.
- Cálculo de total da OS.
- Cálculo de margem estimada.
- Baixa básica de estoque ao salvar OS.
- Dashboard com indicadores básicos.
- Tela financeira inicial com resumo de receita, lucro, ticket médio e margem.
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

- Revisar build TypeScript após as últimas alterações do roadmap.
- Padronizar campos enumeráveis restantes como select/combobox.
- Ajustar mensagens vazias, validações leves e consistência visual onde necessário.
- Melhorar clareza do fluxo financeiro sem quebrar `getFinancialSummary`.
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

### Evolução recomendada

- Tornar o Kanban mais operacional para uso diário.
- Melhorar visão de gargalos por etapa.
- Adicionar indicadores de tempo por etapa.
- Separar claramente visão gerencial desktop e visão operacional mobile.
- Evoluir atualização de status para fluxo de poucos cliques.

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

### Checklist de Entrada / Vistoria Digital

Já existe uma base de vistoria vinculada à OS. A evolução deve incluir:

- Fotos do veículo.
- Arranhões e avarias pré-existentes.
- Nível de combustível.
- Quilometragem.
- Objetos deixados no carro.
- Observações gerais.
- Assinatura/aceite do cliente no futuro.

### Status em Tempo Real para Cliente

Envios automáticos quando o status muda.

Canais por fase:

- E-mail via Resend no MVP.
- SMS como add-on.
- WhatsApp oficial como add-on futuro.

Exemplos:

- Seu carro entrou para lavagem.
- Seu carro está em manutenção.
- O orçamento ficou pronto.
- Seu veículo está pronto para retirada.

---

## Fase 3 - Oficina Mecânica

Objetivo: atender melhor oficina, centro automotivo e autopeças.

### Status atual

Base operacional já iniciada com cadastro de clientes, veículos, serviços, produtos, fornecedores, OS, estoque simples, margem estimada e histórico por placa.

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

A base de serviços, pátio, status e OS já permite demonstrar parte do fluxo, mas ainda não existe módulo dedicado de agenda, fila ou pacotes.

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

Já existe tela financeira inicial baseada nas ordens de serviço, com resumo de receita, lucro estimado, ticket médio, margem e quantidade de OS.

### Próximo módulo recomendado: Contas a Pagar e Receber

Pendente.

Escopo planejado:

- Criar `/financeiro/contas`.
- Criar cadastro de lançamento financeiro.
- Criar tipo `StoredFinancialEntry` no localStorage.
- Criar `listFinancialEntries`, `saveFinancialEntry` e `updateFinancialEntryStatus`.
- Mostrar cards de resumo:
  - A pagar.
  - A receber.
  - Vencido.
  - Pago/recebido.
- Criar tabela de lançamentos.

Campos sugeridos:

- Tipo: Pagar ou Receber.
- Descrição.
- Categoria.
- Valor.
- Vencimento.
- Status.
- Forma de pagamento.
- Observações.

Regras de implementação:

- Tipo deve ser select.
- Categoria deve ser select.
- Status deve ser select.
- Forma de pagamento deve ser select.
- Não substituir a página `/financeiro` atual.
- Não quebrar `getFinancialSummary`.
- O módulo deve complementar o financeiro existente.

### Comissão de Funcionários

Pendente e dependente do cadastro de funcionários.

Modelos previstos:

- Comissão por serviço.
- Comissão por percentual da mão de obra.
- Comissão por veículo lavado.
- Comissão por produto/peça vendido.
- Valor fixo.

Próximos passos:

- Criar módulo de funcionários.
- Criar estrutura preparatória de comissão.
- Relacionar comissão com funcionário quando `StoredEmployee` existir.
- Não alterar cálculo financeiro geral sem autorização.

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

Pendente.

Escopo planejado:

- Criar rota `/funcionarios`.
- Criar rota `/funcionarios/novo`.
- Criar componente de listagem de funcionários.
- Criar componente de formulário de novo funcionário.
- Atualizar `lib/browser-store.ts` com `StoredEmployee`, `listEmployees` e `saveEmployee`.
- Incluir Funcionários no menu somente se necessário.

Campos sugeridos:

- Nome.
- CPF.
- Telefone.
- E-mail.
- Cargo/função.
- Tipo de vínculo.
- Status.

Regras:

- Cargo/função deve ser select.
- Tipo de vínculo deve ser select.
- Status deve ser select.
- Usar `localStorage` no MVP.
- Manter visual atual.
- Não criar comissão nesta etapa, apenas preparar o cadastro.

### Base de Comissões

Pendente.

Escopo planejado:

- Criar tipos de comissão no storage local.
- Criar tela `/comissoes`.
- Criar tela `/comissoes/nova`, se fizer sentido.
- Relacionar comissão com funcionário quando `StoredEmployee` existir.
- Criar selects para tipo de comissão.

Tipos sugeridos:

- Serviço.
- Produto/peça.
- Lavagem.
- Percentual.
- Valor fixo.

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

## Priorização Recomendada Atualizada

### Bloco imediato

1. Revisar erros TypeScript e build após as últimas alterações.
2. Finalizar padronização de selects para campos enumeráveis restantes.
3. Criar módulo de funcionários.
4. Criar base de comissões, dependente de funcionários.
5. Criar módulo financeiro operacional de contas a pagar e receber.

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
5. Integrações fiscais.

---

## Observação Estratégica

Para vender rápido, o AJB AutoFlow não deve prometer todos os módulos no início.

Mensagem comercial recomendada para o MVP:

> Controle sua oficina ou lava-jato pelo celular, acompanhe veículos em atendimento, veja margem das peças, organize ordens de serviço, controle lembretes e avise o cliente quando o veículo estiver pronto.

A estratégia correta é vender o MVP como assinatura inicial do **AJB AutoFlow by AJBSYSTEMS**, validar com clientes reais e evoluir os módulos conforme demanda de mercado.
