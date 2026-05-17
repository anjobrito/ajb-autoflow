# Status de Desenvolvimento Pós-Integração - AJB AutoFlow

Documento de status pós-integração do **AJB AutoFlow by AJBSYSTEMS**.

Este material registra o estado real da branch `main` após a integração dos módulos do MVP, com foco em continuidade técnica, alinhamento comercial e prevenção de retrabalho entre frentes paralelas de desenvolvimento.

---

## Posicionamento do Produto

O **AJB AutoFlow by AJBSYSTEMS** é um SaaS multiempresa voltado para gestão operacional, financeira e comercial de pequenos negócios automotivos, incluindo:

- Oficina mecânica.
- Centro automotivo.
- Lava-jato.
- Estética automotiva.
- Autopeças.

O MVP atual está orientado para validação rápida, demonstração comercial e venda piloto.

A persistência permanece em `localStorage`, sem backend multiempresa real neste momento. A evolução planejada deve manter o posicionamento comercial de plataforma SaaS, mas sem antecipar complexidade técnica antes da validação com usuários reais.

---

## Documentação Conferida

Arquivos de documentação identificados/conferidos antes desta atualização:

- `README.md` na `main`.
- `docs/roadmap-modulos-avancados.md` na `main`.
- `docs/status-desenvolvimento.md` na branch `docs/chat-3-status-pos-integracao`.

Observação: o `README.md` ainda descreve parte da stack futura como se estivesse no fluxo de instalação atual. Este documento de status deixa explícito que, para o MVP integrado, a regra operacional continua sendo `localStorage`, com Prisma + PostgreSQL e Resend tratados como roadmap futuro.

---

## Estado Atual da Main

A `main` já contém uma base funcional integrada para demonstração do MVP.

### Módulos atuais implementados ou iniciados

- Landing page institucional do AJB AutoFlow.
- Página de planos.
- Página de demonstração guiada.
- Cadastro de empresa.
- Cadastro de clientes.
- Cadastro de veículos.
- Campo de propulsão no cadastro do veículo.
- Listagem de veículos com exibição de propulsão.
- Cadastro de fornecedores.
- Cadastro de produtos, peças e insumos.
- Controle básico de estoque com estoque atual e estoque mínimo.
- Cadastro de serviços.
- Ordens de serviço.
- Status operacional da OS.
- Cálculo de total da OS.
- Cálculo de margem estimada.
- Baixa básica de estoque ao salvar OS.
- Dashboard com indicadores básicos.
- Financeiro inicial baseado nas ordens de serviço.
- Contas a pagar e contas a receber.
- Cadastro de funcionários.
- Base preparatória de comissões.
- Pátio/Kanban.
- Histórico do veículo por placa.
- Vistoria/checklist de entrada vinculada à OS.
- Lembretes operacionais.
- Aviso demo de veículo pronto.
- Centralização de opções enumeráveis em `lib/select-options.ts`.
- Padronização inicial de campos enumeráveis como selects.
- Correções de rotas dinâmicas para Next 15.
- Correção do nome do pacote para `ajb-autoflow`.
- Documentação técnica e comercial inicial.

---

## Módulos Recém-Integrados

A integração mais relevante da `main` consolidou módulos que vinham sendo tratados em frentes paralelas.

### Funcionários

Status: integrado ao MVP.

Inclui:

- Rotas de listagem e cadastro de funcionários.
- Storage local com estrutura preparatória para equipe.
- Campos enumeráveis como cargo/função, vínculo e status.
- Entrada no menu global.

### Comissões preparatórias

Status: integrado como base preparatória.

Inclui:

- Cadastro e listagem de comissões.
- Vínculo com funcionário quando existir cadastro.
- Tipos e bases de comissão centralizados em selects.
- Preparação para comissões por serviço, produto/peça e lavagem.

Limite atual:

- A comissão ainda não é calculada automaticamente na OS.
- A comissão ainda não impacta o financeiro geral.

### Contas a pagar e contas a receber

Status: integrado como complemento do financeiro inicial.

Inclui:

- Lançamentos financeiros operacionais.
- Classificação entre pagar e receber.
- Status financeiro do lançamento.
- Cards de resumo.

Limite atual:

- O financeiro principal continua baseado nas ordens de serviço.
- Ainda não existe consolidação contábil completa entre OS, contas e comissões.

### Propulsão do veículo

Status: integrado no cadastro e na visualização.

Inclui:

- Campo de propulsão do veículo.
- Exibição em listagem de veículos.
- Exibição em detalhe/histórico quando aplicável.
- Opções como flex, gasolina, etanol, diesel, GNV, híbrido, híbrido plug-in e elétrico.

### Selects centralizados

Status: integrado como padrão técnico do MVP.

Inclui:

- Centralização de opções enumeráveis em `lib/select-options.ts`.
- Uso recomendado para campos com valores fechados.
- Redução de strings soltas em formulários.

---

## PRs Já Mergeados

### PR #4 — Integrar módulos do roadmap AJB AutoFlow

Status: mergeado na `main`.

Escopo principal:

- Integração consolidada dos módulos do roadmap.
- Correção de rotas dinâmicas para Next 15.
- Consolidação de storage local para veículos com propulsão, funcionários, comissões e financeiro operacional.
- Consolidação de selects centralizados.
- Inclusão de Funcionários e Comissões no menu global.
- Novo módulo de Contas a pagar/receber.
- Padronização inicial de selects em nova OS e novo lembrete.
- Atualização do roadmap.

Regras preservadas:

- Mantém `localStorage`.
- Não migra para Prisma/PostgreSQL.
- Não altera cálculo financeiro geral da OS.
- Não integra APIs externas.
- Mantém o posicionamento SaaS multiempresa do AJB AutoFlow by AJBSYSTEMS.

### PR #5 — Corrigir nome do pacote AJB AutoFlow

Status: mergeado na `main`.

Escopo principal:

- Correção do nome do pacote para `ajb-autoflow`.
- Alinhamento do metadado do projeto ao nome comercial AJB AutoFlow by AJBSYSTEMS.

Regras preservadas:

- Não altera código de aplicação.
- Não altera layout.
- Não altera dependências.

---

## PRs Pendentes ou Em Revisão

### PR #6 — Melhorar pátio mobile operacional

Status: aberto no momento deste documento.

Escopo declarado:

- Melhorar `/mobile/patio` para uso operacional em celular/tablet.
- Cards grandes, visual operacional e ações rápidas.
- Exibir OS, cliente, veículo, placa, serviço, status e tempo operacional.

Ponto de atenção:

- Deve continuar sem alterar `StoredWorkOrder`, financeiro, comissões, Prisma/PostgreSQL ou layout global.

### PR #7 — CHAT 2 — UX Comercial do MVP

Status: aberto no momento deste documento.

Escopo declarado:

- Revisão incremental de UX comercial.
- Ajustes de microcopy, CTAs, descrições e mensagens vazias.
- Reforço do posicionamento SaaS multiempresa.

Ponto de atenção:

- Deve permanecer restrito a texto/microcopy, sem alterar storage, tipos, regra de negócio, cálculo financeiro ou layout estrutural.

### PR deste documento — CHAT 3 — Documentação Pós-Integração

Status esperado: abrir PR da branch `docs/chat-3-status-pos-integracao` para `main`.

Escopo:

- Documentação de status pós-integração.
- Atualização do roadmap para refletir o estado pós-integração.
- Registro de módulos atuais, módulos recém-integrados, PRs, riscos e próximos passos.

---

## Regras Técnicas Preservadas no MVP

- O MVP usa `localStorage` como persistência local.
- Não há backend produtivo ativo para multiempresa nesta fase.
- Não há Prisma + PostgreSQL implementado como persistência ativa do MVP.
- Não há autenticação real implementada ainda.
- Não há isolamento real por tenant implementado ainda.
- Não há envio real por Resend implementado ainda.
- Não há integração oficial de WhatsApp implementada ainda.
- Não há integração Pix implementada ainda.
- Não há integração fiscal implementada ainda.
- O cálculo financeiro geral da tela financeira permanece baseado nas ordens de serviço.
- Contas a pagar/receber complementa o financeiro, mas ainda não consolida automaticamente todo o resultado contábil.
- A base de comissões é preparatória; o cálculo de comissão ainda não está integrado automaticamente à OS ou ao financeiro.

---

## Riscos Técnicos Identificados

### Risco 1 — README desalinhado com o estágio real do MVP

O `README.md` menciona PostgreSQL, Prisma e Resend como stack/instalação, mas o estágio operacional atual do MVP continua em `localStorage`.

Mitigação recomendada:

- Atualizar o README em PR específico para separar claramente `MVP atual` e `roadmap futuro`.
- Evitar instruções obrigatórias de Prisma/PostgreSQL enquanto a persistência ativa for local.

### Risco 2 — Crescimento do `localStorage`

O MVP já concentra vários módulos em storage local: clientes, veículos, produtos, serviços, OS, lembretes, funcionários, comissões e financeiro operacional.

Mitigação recomendada:

- Manter o `localStorage` até validação comercial.
- Evitar refatorações prematuras.
- Preparar inventário dos tipos atuais antes da migração futura para Prisma + PostgreSQL.

### Risco 3 — Comissões ainda não integradas ao cálculo financeiro

A base de comissões existe, mas ainda não afeta OS, lucro, margem ou financeiro.

Mitigação recomendada:

- Tratar comissão automática como etapa futura específica.
- Definir primeiro a regra de cálculo por serviço, peça, lavagem, valor fixo e percentual.
- Não acoplar comissão ao financeiro sem testes e validação de regra.

### Risco 4 — Financeiro operacional ainda parcial

Contas a pagar/receber complementa o financeiro, mas o resultado geral ainda depende principalmente das ordens de serviço.

Mitigação recomendada:

- Manter `getFinancialSummary` estável.
- Evoluir baixa de OS, checkout/PDV e conciliação em etapas separadas.
- Evitar alteração de cálculo financeiro em PRs de UX ou documentação.

### Risco 5 — PRs paralelos podem divergir em UX e documentação

PRs de pátio mobile, UX comercial e documentação podem se sobrepor em mensagens, posicionamento e estado da `main`.

Mitigação recomendada:

- Revisar sempre a `main` antes de cada alteração.
- Manter PRs pequenos e com escopo claro.
- Evitar merge automático sem revisão do diff.

### Risco 6 — Ausência de CI obrigatório

Não há garantia automática de build em cada PR.

Mitigação recomendada:

- Rodar localmente `npm install` e `npm run build` antes do merge.
- Futuramente criar workflow de CI com build TypeScript/Next.

---

## Módulos Pendentes

### Plataforma SaaS multiempresa real

Pendente.

Próximos itens esperados:

- Autenticação.
- Cadastro de empresa/tenant com isolamento real de dados.
- Controle de usuários por empresa.
- Controle de planos e permissões.
- Migração de `localStorage` para backend.

### Backend e banco de dados

Pendente.

Direção planejada:

- Prisma.
- PostgreSQL.
- Modelagem de empresas/tenants.
- Migração controlada dos dados atuais do MVP.

### E-mails transacionais

Pendente.

Direção planejada:

- Integração futura com Resend.
- Envio real de lembretes.
- Envio real de aviso de veículo pronto.
- Templates comerciais por empresa no futuro.

### WhatsApp, Pix e fiscal

Pendentes e classificados como evolução futura.

Direções planejadas:

- WhatsApp oficial para comunicação com cliente.
- Pix no checkout/baixa de pagamento.
- Integrações fiscais como módulos premium ou avançados.
- NFS-e, NF-e, certificado digital e regras fiscais somente em fase posterior.

### Lava-jato e estética automotiva dedicados

Pendente como módulo específico.

A base atual permite demonstrar fluxo por OS, serviço, pátio, funcionário e comissão, mas ainda não existe módulo dedicado de:

- Agenda online.
- Grade de horários.
- Fila operacional.
- Pacotes de lavagem.
- Assinaturas recorrentes.

### Mobile operacional de pátio

Parcialmente iniciado.

Já existe base de pátio/Kanban e status de OS, mas ainda falta consolidar uma experiência mobile dedicada com:

- Cards grandes para celular.
- Fluxo de iniciar/finalizar em poucos toques.
- Checklist visual com fotos.
- Cronômetro por atendimento.
- Responsável operacional vinculado à OS.

---

## Próximos Passos Técnicos Recomendados

Prioridade recomendada para continuidade:

1. Rodar build TypeScript após a integração da `main`.
2. Revisar imports, tipos e eventuais inconsistências de componentes.
3. Navegar manualmente pelos módulos integrados.
4. Validar persistência local em `localStorage` nos fluxos principais.
5. Revisar mensagens vazias, validações leves e feedbacks de tela.
6. Concluir e revisar o PR de pátio mobile operacional.
7. Concluir e revisar o PR de UX comercial do MVP.
8. Planejar o vínculo operacional entre OS, funcionário e futura comissão calculada.
9. Preparar inventário de tipos e entidades antes da migração para Prisma + PostgreSQL.
10. Planejar autenticação e isolamento multiempresa como etapa posterior ao MVP validado.
11. Planejar Resend como primeira integração real de comunicação.
12. Tratar WhatsApp oficial, Pix e fiscal como trilhas posteriores e separadas.

---

## Próximos Passos Comerciais Recomendados

Prioridade recomendada para venda piloto:

1. Demonstrar o AJB AutoFlow como solução simples para controle de oficina, lava-jato e centro automotivo.
2. Reforçar o valor do fluxo completo: cliente, veículo, OS, pátio, estoque, financeiro, equipe e histórico.
3. Posicionar o produto como **AJB AutoFlow by AJBSYSTEMS**, SaaS multiempresa em evolução.
4. Apresentar o MVP como assinatura inicial para pequenos negócios automotivos.
5. Não prometer módulos futuros como se já estivessem prontos.
6. Usar WhatsApp, Pix, fiscal, Resend, Prisma e PostgreSQL como roadmap evolutivo.
7. Coletar feedback real de oficinas, lava-jatos e centros automotivos antes de grandes refatorações.
8. Transformar as dores do cliente em priorização de módulos.

---

## Roadmap Futuro Consolidado

### Prisma + PostgreSQL

Objetivo futuro:

- Substituir `localStorage` por persistência real.
- Criar modelo de dados multiempresa.
- Isolar clientes, veículos, OS, produtos, funcionários, comissões e financeiro por empresa.
- Preparar autenticação e permissões.

Regra atual:

- Não migrar agora.
- Não alterar storage no MVP sem PR específico.

### Resend

Objetivo futuro:

- Enviar lembretes reais por e-mail.
- Enviar aviso real de veículo pronto.
- Criar templates por evento operacional.

Regra atual:

- Não integrar Resend agora.
- Manter avisos como simulação/demo no MVP.

### WhatsApp oficial

Objetivo futuro:

- Notificação de veículo pronto.
- Lembretes de revisão.
- Confirmação de agendamento.
- Comunicação de orçamento aprovado/reprovado.

Regra atual:

- Não integrar WhatsApp agora.
- Tratar como etapa posterior, preferencialmente após validação do fluxo por e-mail.

### Pix

Objetivo futuro:

- Checkout/baixa de pagamento.
- Geração de cobrança Pix.
- Registro de status de pagamento.

Regra atual:

- Não integrar Pix agora.
- Criar primeiro baixa manual e PDV/check-out em etapa própria.

### Fiscal

Objetivo futuro:

- NFS-e.
- NF-e.
- Certificado digital.
- Integração municipal/SEFAZ.
- Regras fiscais e tributárias.

Regra atual:

- Não integrar fiscal agora.
- Tratar como módulo premium/avançado após estabilização comercial.

---

## Mensagem Comercial Segura para o MVP

> O AJB AutoFlow by AJBSYSTEMS ajuda pequenos negócios automotivos a controlar clientes, veículos, ordens de serviço, pátio, estoque, equipe, comissões preparatórias, contas a pagar/receber e histórico do veículo em uma experiência simples e pronta para evoluir como SaaS multiempresa.

Mensagem complementar:

> O MVP atual usa `localStorage` para validação rápida. A evolução técnica planejada inclui Prisma + PostgreSQL, autenticação, isolamento por empresa, Resend, WhatsApp oficial, Pix e módulos fiscais em fases futuras.

---

## Pontos de Atenção para Próximos Chats/Devs

- Não alterar código sem revisar a versão atual da `main`.
- Não alterar layout global sem necessidade.
- Não substituir o `localStorage` antes da etapa planejada de backend.
- Não alterar regras de negócio consolidadas no MVP sem teste manual.
- Não integrar comissões automaticamente no financeiro sem etapa específica.
- Não prometer WhatsApp, Pix, fiscal, Resend ou backend como funcionalidades já existentes.
- Manter campos enumeráveis usando selects e opções centralizadas sempre que possível.
- Preservar linguagem comercial e técnica alinhada ao posicionamento SaaS multiempresa.
- Manter PRs de documentação separados de PRs de código.

---

## Conclusão

A `main` está em estado de MVP comercial integrado, com boa base para demonstração e venda piloto.

A recomendação é estabilizar o que já existe, validar com clientes reais e evoluir em ciclos curtos, priorizando pátio mobile, UX comercial, comunicação por e-mail, melhoria do financeiro operacional e preparação gradual da arquitetura SaaS multiempresa.
