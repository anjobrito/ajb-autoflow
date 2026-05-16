# AIB AutoFlow

SaaS multiempresa para gestão de oficinas, lava-jatos, estética automotiva e serviços automotivos.

## Objetivo

Permitir que pequenas empresas automotivas controlem clientes, veículos, estoque, serviços e ordens de serviço em uma plataforma online, responsiva e preparada para uso no celular.

## Proposta comercial

**Controle sua oficina ou lava-jato pelo celular.**

O AIB AutoFlow ajuda pequenos negócios automotivos a organizar atendimento, clientes, veículos, peças, serviços e avisos ao cliente final quando o veículo estiver pronto para retirada.

## MVP inicial

- Landing page comercial
- Dashboard responsivo
- Cadastro de empresas/tenants
- Usuários por empresa
- Clientes da empresa
- Veículos dos clientes
- Produtos, peças e insumos
- Serviços prestados
- Ordens de serviço
- Status de atendimento
- Controle básico de estoque
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
npx prisma generate
npm run dev
```

## Banco de dados

Configure a variável `DATABASE_URL` no arquivo `.env`.

```env
DATABASE_URL="postgresql://user:password@localhost:5432/aib_autoflow?schema=public"
```

Depois execute:

```bash
npx prisma migrate dev
```

## Observação de produto

O projeto nasce com arquitetura multiempresa. Cada oficina, lava-jato ou empresa automotiva possui seus próprios usuários, clientes, veículos, estoque e ordens de serviço isolados por `companyId`.
