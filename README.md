# AJB AutoFlow

SaaS multiempresa para gestão de oficinas, lava-jatos, estética automotiva e serviços automotivos.

## Objetivo

Permitir que pequenas empresas automotivas controlem clientes, veículos, estoque, serviços, ordens de serviço, comissões e contas financeiras em uma plataforma online, responsiva e preparada para uso no celular.

## Proposta comercial

**Controle sua oficina ou lava-jato pelo celular.**

O AJB AutoFlow ajuda pequenos negócios automotivos a organizar atendimento, clientes, veículos, peças, serviços, contas a pagar/receber e avisos ao cliente final quando o veículo estiver pronto para retirada.

## MVP inicial

- Landing page comercial
- Dashboard responsivo
- Cadastro de empresas/tenants
- Usuários por empresa
- Clientes da empresa
- Veículos dos clientes
- Fornecedores
- Funcionários/responsáveis
- Produtos, peças e insumos
- Serviços prestados
- Ordens de serviço
- Status de atendimento
- Controle básico de estoque
- Checklist/inspeção de entrada
- Comissões por serviço, peça, lavagem ou OS
- Contas a pagar e receber
- Lembretes e notificações por e-mail
- Controle de assinatura/licença

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- Resend
- Vercel

## Instalação local

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Banco de dados

Configure a variável `DATABASE_URL` no arquivo `.env`.

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ajb_autoflow?schema=public"
```

Depois execute:

```bash
npm run prisma:migrate
npm run prisma:seed
```

Para inspecionar os dados:

```bash
npm run prisma:studio
```

## Observação de produto

O projeto nasce com arquitetura multiempresa. Cada oficina, lava-jato ou empresa automotiva possui seus próprios usuários, clientes, veículos, estoque, ordens de serviço, comissões e contas financeiras isolados por `companyId`.

## Documentação da migração

Consulte `docs/AJB-V1-04-PRISMA-POSTGRESQL.md` para ver a estratégia de migração incremental do MVP em `localStorage` para Prisma + PostgreSQL.
