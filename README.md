# AJB AutoFlow

**AJB AutoFlow** é um sistema web em desenvolvimento pela **AJBSYSTEMS** para apoiar a gestão operacional de oficinas mecânicas, auto centers, estética automotiva, lava-rápidos e pequenos negócios do setor automotivo.

O objetivo do projeto é oferecer uma solução simples, organizada e evolutiva para cadastro de clientes, veículos, funcionários, ordens de serviço, histórico de atendimentos e controles operacionais básicos.

Este projeto está em fase de **MVP**. A prioridade atual é validar fluxo de uso, organização das telas, regras iniciais de negócio e experiência do usuário antes da evolução para backend, banco de dados, autenticação completa e recursos comerciais avançados.

---

## Status do projeto

```txt
AJB V1 — Em desenvolvimento ativo
```

A versão atual utiliza persistência local no navegador por meio de `localStorage`.

Essa decisão é intencional nesta fase. Ela permite evoluir a interface, os fluxos e as regras principais com rapidez e segurança antes da migração para uma arquitetura backend definitiva.

---

## Objetivo

O AJB AutoFlow busca resolver problemas comuns em pequenos e médios negócios automotivos, como:

- perda de histórico de atendimento;
- controle manual de ordens de serviço;
- dificuldade para localizar dados de clientes e veículos;
- falta de padronização nos cadastros;
- ausência de visão organizada sobre serviços realizados;
- dependência excessiva de planilhas, cadernos ou anotações soltas.

A proposta é evoluir gradualmente para uma plataforma SaaS multiempresa, permitindo que diferentes empresas utilizem o sistema de forma separada, organizada e escalável.

---

## Público-alvo

O sistema foi pensado para atender negócios como:

- oficinas mecânicas;
- auto centers;
- centros automotivos;
- lava-rápidos;
- estética automotiva;
- pequenos prestadores de serviço automotivo;
- empresas que precisam controlar clientes, veículos e serviços realizados.

---

## Funcionalidades atuais do MVP

A versão atual contempla funcionalidades essenciais para validação do produto.

### Clientes

- Cadastro de clientes.
- Listagem de clientes.
- Edição de dados cadastrais.
- Exclusão de registros.
- Organização visual seguindo o padrão do sistema.

### Veículos

- Cadastro de veículos vinculados ao cliente.
- Listagem de veículos.
- Edição de dados do veículo.
- Exclusão de veículos.
- Estrutura preparada para informações como motorização/powertrain.

### Funcionários

- Cadastro inicial de funcionários.
- Uso de funcionário/responsável em fluxos operacionais.
- Base preparada para evolução futura de comissões.

### Ordens de serviço

- Criação de ordens de serviço.
- Visualização de detalhes.
- Histórico operacional básico.
- Estrutura preparada para evolução de serviços, peças, lavagens e comissões.

### Histórico

- Consulta de registros relacionados a clientes, veículos e atendimentos.
- Base inicial para evolução de histórico detalhado de manutenção.

### Interface

- Layout padronizado.
- Componentes visuais consistentes.
- Preservação do padrão visual já definido no projeto.
- Desenvolvimento incremental para evitar que novas funcionalidades quebrem telas existentes.

---

## Funcionalidades planejadas

### Curto prazo

- Revisar uso de powertrain/motorização no `StoredVehicle`.
- Exibir powertrain nas telas de listagem, detalhe, histórico e ordem de serviço.
- Corrigir eventuais erros TypeScript gerados pelas novas propriedades.
- Padronizar campos enumeráveis como selects.
- Melhorar consistência dos formulários.

### Médio prazo

- Campos de comissão por funcionário.
- Comissão por serviço.
- Comissão por peça.
- Comissão por lavagem.
- Contas a pagar.
- Contas a receber.
- Relatórios operacionais básicos.

### Futuro

- Migração do MVP em `localStorage` para backend com banco de dados.
- Uso de Prisma.
- Uso de PostgreSQL.
- Autenticação de usuários.
- Separação multiempresa.
- Perfis de acesso.
- Integração com envio de e-mails usando Resend.
- Deploy em ambiente SaaS.
- Painel administrativo.
- Recursos comerciais para assinatura do sistema.

---

## Arquitetura atual

```txt
Frontend
└── Next.js / React / TypeScript

Persistência atual
└── localStorage

Persistência futura planejada
└── Prisma + PostgreSQL
```

Nesta fase, o `localStorage` é usado como camada temporária de persistência para validar regras e telas antes da implementação definitiva do backend.

---

## Stack atual

- Next.js
- React
- TypeScript
- Tailwind CSS
- localStorage

## Stack planejada para evolução

- Prisma ORM
- PostgreSQL
- Resend
- Autenticação
- Deploy em ambiente SaaS

---

## Diretrizes de desenvolvimento

Este projeto segue algumas diretrizes importantes:

- alterar somente o necessário;
- preservar o CSS e o layout existente;
- manter o padrão visual já adotado;
- entregar arquivos completos ao alterar código;
- evitar mudanças grandes e arriscadas em uma única etapa;
- evoluir de forma incremental;
- usar selects para campos com valores enumeráveis;
- manter `localStorage` durante a fase MVP;
- preparar a base para futura arquitetura SaaS multiempresa.

---

## Posicionamento comercial

O AJB AutoFlow não é apresentado como produto finalizado nesta fase.

A proposta comercial realista é:

```txt
Sistema em desenvolvimento para gestão automotiva, com MVP funcional em evolução e arquitetura planejada para futura oferta como SaaS multiempresa.
```

O foco atual é construir uma base sólida, validável e demonstrável para portfólio, apresentações comerciais iniciais e evolução técnica.

---

## Diferenciais pretendidos

Os diferenciais planejados para o sistema incluem:

- foco específico no setor automotivo;
- interface simples para uso operacional;
- histórico centralizado por cliente e veículo;
- possibilidade futura de gestão multiempresa;
- controle de ordens de serviço;
- evolução para comissões e financeiro;
- possibilidade de integração futura com e-mail e notificações;
- desenvolvimento orientado a um fluxo real de oficina ou auto center.

---

## Limitações atuais

Como o projeto ainda está em fase MVP, existem limitações conhecidas:

- os dados são salvos localmente no navegador;
- não há autenticação real de usuários;
- não há banco de dados em produção;
- não há controle multiempresa definitivo;
- não há deploy comercial oficial;
- relatórios ainda são limitados;
- financeiro e comissões ainda estão em evolução ou planejamento;
- integrações externas ainda não foram implementadas.

Essas limitações são intencionais nesta fase para manter o desenvolvimento seguro, controlado e incremental.

---

## Roadmap resumido

```txt
V1-00 — Organização geral e alinhamento do projeto
V1-01 — CI e proteção da main
V1-02 — README e documentação comercial realista
V1-03 — Revisão de powertrain em veículos
V1-04 — Padronização de selects enumeráveis
V1-05 — Cadastro de funcionários
V1-06 — Comissões
V1-07 — Contas a pagar e receber
V1-08 — Migração futura para backend
```

---

## Uso como portfólio

Este projeto também serve como demonstração técnica de desenvolvimento full stack progressivo, envolvendo:

- modelagem de domínio;
- organização de telas;
- componentes reutilizáveis;
- TypeScript;
- React;
- Next.js;
- persistência temporária;
- roadmap para backend;
- visão SaaS;
- documentação comercial;
- versionamento por etapas.

---

## Execução local

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Next.js no navegador.

---

## Documentação complementar

A documentação comercial do projeto está disponível em:

```txt
docs/COMMERCIAL.md
```

---

## Autor

Projeto desenvolvido por:

```txt
AJBSYSTEMS
```

Responsável:

```txt
Andre Brito
```

---

## Licença

Este projeto ainda não possui uma licença pública definida.

Até que uma licença seja formalmente adicionada, o uso, cópia, distribuição ou exploração comercial do código não está autorizado sem permissão expressa do autor.
