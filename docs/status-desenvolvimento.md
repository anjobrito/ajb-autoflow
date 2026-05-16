# Status de Desenvolvimento - AJB AutoFlow

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

O MVP atual está orientado para validação rápida, demonstração comercial e venda piloto. A persistência permanece em `localStorage`, sem backend multiempresa real neste momento.

A evolução planejada deve manter o posicionamento comercial de plataforma SaaS, mas sem antecipar complexidade técnica antes da validação com usuários reais.

---

## Estado Atual da Main

A `main` já contém uma base funcional integrada para demonstração do MVP.

### Módulos implementados ou iniciados

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
- Documentação técnica e comercial inicial.

---

## Regras Técnicas Preservadas no MVP

- O MVP usa `localStorage` como persistência local.
- Não há backend produtivo ativo para multiempresa nesta fase.
- Não há Prisma + PostgreSQL implementado ainda.
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

Já existe base de pátio/Kanban e status de OS, mas ainda falta experiência mobile dedicada com:

- Cards grandes para celular.
- Fluxo de iniciar/finalizar em poucos toques.
- Checklist visual com fotos.
- Cronômetro por atendimento.
- Responsável operacional vinculado à OS.

---

## Próximos Passos Técnicos

Prioridade recomendada para continuidade:

1. Rodar build TypeScript após a integração da `main`.
2. Revisar imports, tipos e eventuais inconsistências de componentes.
3. Navegar manualmente pelos módulos integrados.
4. Validar persistência local em `localStorage` nos fluxos principais.
5. Revisar mensagens vazias, validações leves e feedbacks de tela.
6. Evoluir a experiência mobile de pátio sem quebrar layout global.
7. Planejar o vínculo operacional entre OS, funcionário e futura comissão calculada.
8. Preparar arquitetura futura para Prisma + PostgreSQL sem migrar prematuramente.
9. Planejar autenticação e isolamento multiempresa como etapa posterior ao MVP validado.
10. Planejar Resend como primeira integração real de comunicação.

---

## Próximos Passos Comerciais

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

---

## Conclusão

A `main` está em estado de MVP comercial integrado, com boa base para demonstração e venda piloto.

A recomendação é estabilizar o que já existe, validar com clientes reais e evoluir em ciclos curtos, priorizando pátio mobile, comunicação por e-mail, melhoria do financeiro operacional e preparação gradual da arquitetura SaaS multiempresa.
