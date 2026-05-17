# AJB V1-04 — Migração Prisma + PostgreSQL

Esta etapa prepara o AJB AutoFlow para sair do MVP baseado em `localStorage` e operar com persistência real em PostgreSQL usando Prisma ORM.

## Diretriz da etapa

A migração foi feita de forma incremental e segura:

- O layout existente não foi alterado.
- As telas atuais que usam `localStorage` continuam funcionando.
- O schema Prisma foi expandido para refletir os módulos já criados no MVP.
- A arquitetura multiempresa foi mantida com isolamento por `companyId`.
- A base agora possui modelos para empresas, usuários, clientes, veículos, fornecedores, funcionários, produtos, serviços, ordens de serviço, inspeções, comissões, contas a pagar/receber, lembretes e assinatura.
- Resend continua apenas configurável no `.env`, sem integração nova nesta etapa.

## Arquivos principais

- `prisma/schema.prisma`: modelo relacional oficial da aplicação.
- `prisma/seed.js`: seed mínimo com empresa demo.
- `lib/db.ts`: client Prisma para uso server-side.
- `lib/tenant.ts`: helper temporário para recuperar a empresa demo.
- `lib/prisma-mappers.ts`: ponto reservado para conversões entre enums técnicos do banco e labels da UI.
- `.env.example`: variável `DATABASE_URL` corrigida para `ajb_autoflow`.
- `package.json`: scripts de geração, migração, push, seed e studio.

## Banco local com PostgreSQL

Crie o banco local:

```bash
createdb ajb_autoflow
```

Ou use Docker/PostgreSQL local, mantendo a mesma URL no `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ajb_autoflow?schema=public"
APP_URL="http://localhost:3000"
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxx"
```

## Comandos da migração

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Para abrir o banco visualmente:

```bash
npm run prisma:studio
```

## Estratégia para a próxima etapa

A aplicação ainda tem telas client-side usando `localStorage`. A próxima etapa recomendada é migrar módulo por módulo para Server Actions/API routes, nesta ordem:

1. Empresa/tenant demo.
2. Clientes.
3. Veículos.
4. Fornecedores.
5. Funcionários.
6. Produtos e serviços.
7. Ordens de serviço e itens.
8. Inspeções/checklist.
9. Comissões.
10. Contas a pagar e receber.
11. Dashboard e resumos financeiros.

Essa ordem reduz risco porque mantém as entidades base antes dos módulos transacionais.

## Observação comercial

O AJB AutoFlow continua posicionado como SaaS multiempresa by AJBSYSTEMS. O schema reforça esse posicionamento porque todas as entidades operacionais relevantes ficam vinculadas a uma empresa (`companyId`).
