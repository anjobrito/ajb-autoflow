# Status de Desenvolvimento - AJB AutoFlow

Este documento consolida o status atual do **AJB AutoFlow by AJBSYSTEMS** para orientar próximas branches de desenvolvimento sem misturar escopos.

O produto está sendo conduzido como uma plataforma **SaaS multiempresa** para oficinas mecânicas, lava-jatos, estética automotiva, autopeças e centros automotivos. O MVP ainda usa `localStorage` para validação rápida, mantendo a estratégia futura de migração para Prisma + PostgreSQL.

---

## Posicionamento do Produto

O AJB AutoFlow deve ser vendido como uma solução simples e prática para controlar:

- Empresas automotivas.
- Clientes.
- Veículos.
- Ordens de serviço.
- Pátio.
- Estoque.
- Serviços.
- Fornecedores.
- Histórico do veículo.
- Margem estimada.
- Lembretes e retorno do cliente.
- Financeiro operacional em evolução.

Mensagem comercial base:

> Controle sua oficina ou lava-jato pelo celular, acompanhe veículos em atendimento, veja margem das peças, organize ordens de serviço, controle lembretes e avise o cliente quando o veículo estiver pronto.

---

## Módulos já implementados ou iniciados

### Institucional e comercial

- Landing page do AJB AutoFlow.
- Página de planos.
- Página de demonstração guiada.
- Chamada comercial para assinatura mensal.
- Posicionamento como AJB AutoFlow by AJBSYSTEMS.

### Base operacional

- Dashboard.
- Menu lateral com módulos principais.
- Cadastro da empresa.
- Cadastro de clientes.
- Cadastro de veículos.
- Cadastro de fornecedores.
- Cadastro de produtos/peças/insumos.
- Cadastro de serviços.
- Ordens de serviço.
- Pátio/Kanban inicial.
- Histórico do veículo por placa.
- Checklist/vistoria de entrada.
- Lembretes.
- Financeiro inicial.

### Veículos e powertrain

- `StoredVehicle` possui campo `powertrain`.
- Cadastro de veículo contempla propulsão.
- Opções incluem flex, gasolina, etanol, diesel, GNV, híbrido, híbrido plug-in e elétrico.
- Listagem de veículos mostra propulsão.
- Detalhe da ordem de serviço mostra propulsão do veículo.
- Histórico do veículo mostra propulsão.

### Ordens de serviço

- `StoredWorkOrder` contempla cliente, veículo, serviço, produto, quantidade, custos, totais, margem e status.
- Geração de código de OS.
- Baixa básica de estoque ao salvar OS.
- Atualização de status.
- Marcação de `startedAt` quando status vai para Em andamento.
- Marcação de `finishedAt` quando status vai para Pronta para retirada.

### Estoque e margem

- Cadastro de produto com categoria, fornecedor, estoque, estoque mínimo, custo e preço.
- Baixa simples de estoque vinculada à OS.
- Cálculo de lucro e margem estimada.
- Resumo financeiro inicial baseado nas OS.

### Selects e campos enumeráveis

- `lib/select-options.ts` centraliza opções enumeráveis.
- Já existem opções para:
  - Tipo de negócio.
  - Estados brasileiros.
  - Cidades comuns.
  - Marcas de veículos.
  - Propulsão de veículo.
  - Categorias de produto.
  - Categorias de serviço.
  - Status de serviço.
  - Status de OS.
  - Canais de lembrete.
  - Status de lembrete.
  - Nível de combustível.
- Padronização de selects já iniciada em cadastros importantes.

---

## Módulos pendentes priorizados

### 1. Revisão TypeScript/build

Branch sugerida:

`fix/typescript-roadmap`

Escopo:

- Rodar/verificar build se possível.
- Corrigir tipagens quebradas.
- Corrigir imports quebrados.
- Corrigir propriedades ausentes em tipos.
- Corrigir uso de `localStorage` e tipos `Stored*`.

Regras:

- Não criar funcionalidades novas.
- Não alterar layout.
- Corrigir apenas o necessário para compilar.
- Se encontrar erro causado por outra branch não mergeada, avisar.

### 2. Padronização final de selects

Branch sugerida:

`feature/padronizar-selects`

Escopo:

- Revisar formulários existentes.
- Atualizar `lib/select-options.ts` com listas faltantes.
- Substituir inputs livres por select quando o valor for enumerável.

Regras:

- Não alterar layout.
- Não alterar regra de negócio.
- Não mexer em storage salvo, exceto se necessário.
- Não alterar campos que devem continuar texto livre, como observações, nome, e-mail e descrição.
- Ao final, listar quais campos foram convertidos para select.

### 3. Cadastro de funcionários

Branch sugerida:

`feature/funcionarios`

Escopo:

- Criar rota `/funcionarios`.
- Criar rota `/funcionarios/novo`.
- Criar listagem de funcionários.
- Criar formulário de novo funcionário.
- Atualizar `lib/browser-store.ts` com `StoredEmployee`, `listEmployees` e `saveEmployee`.
- Atualizar menu somente se necessário.

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
- Usar `localStorage`.
- Manter visual atual.
- Não criar comissão ainda.

### 4. Comissões

Branch sugerida:

`feature/comissoes`

Dependência:

- Verificar se `StoredEmployee` já existe.
- Se funcionários ainda não existir, implementar apenas estrutura preparatória ou avisar dependência.

Escopo:

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

Regras:

- Não alterar cálculo financeiro geral sem autorização.
- Não mexer profundamente em OS se não for necessário.
- Se precisar alterar `StoredWorkOrder`, explicar o impacto antes.

### 5. Contas a pagar e receber

Branch sugerida:

`feature/contas-pagar-receber`

Escopo:

- Criar `/financeiro/contas`.
- Criar cadastro de lançamento financeiro.
- Criar tipo `StoredFinancialEntry` no `localStorage`.
- Criar `listFinancialEntries`, `saveFinancialEntry` e `updateFinancialEntryStatus`.
- Mostrar cards de resumo: a pagar, a receber, vencido, pago/recebido.
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

Regras:

- Tipo deve ser select.
- Categoria deve ser select.
- Status deve ser select.
- Forma de pagamento deve ser select.
- Não substituir a página `/financeiro` atual.
- Não quebrar `getFinancialSummary`.
- O módulo deve complementar o financeiro existente.

---

## Diretrizes permanentes de desenvolvimento

- Entregar arquivos completos quando alterar código.
- Não quebrar CSS/layout existente.
- Preservar o padrão visual atual.
- Fazer mudanças incrementais e seguras.
- Não refatorar arquivos grandes sem necessidade.
- Usar selects para valores enumeráveis.
- Manter `localStorage` no MVP.
- Não antecipar Prisma/PostgreSQL antes da etapa planejada.
- Reforçar sempre o posicionamento AJB AutoFlow by AJBSYSTEMS.
- Manter visão comercial SaaS multiempresa.

---

## Próxima sequência recomendada

1. `fix/typescript-roadmap`.
2. `feature/padronizar-selects`.
3. `feature/funcionarios`.
4. `feature/comissoes`.
5. `feature/contas-pagar-receber`.
6. Evolução mobile de pátio.
7. Migração futura para Prisma + PostgreSQL.
8. Integração futura com Resend.

---

## Observação estratégica

O AJB AutoFlow deve continuar sendo desenvolvido como MVP comercial vendável, não como sistema corporativo pesado logo no início.

A prioridade é validar valor com clientes reais, vender assinatura inicial e evoluir módulos premium conforme demanda concreta do mercado.
