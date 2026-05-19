# AJB AutoFlow V2 — Authentication and Multi-Company Planning

## Product

AJB AutoFlow by AJBSYSTEMS

## Purpose

This document defines the authentication, authorization and multi-company planning for AJB AutoFlow V2.

The goal is to evolve the current V1 localStorage MVP into a real SaaS architecture where users authenticate securely and each company can only access its own data.

## Current baseline

The current V1 is a stable localStorage MVP.

The V2 migration must preserve the V1 business flows while introducing:

- authentication;
- user sessions;
- route protection;
- company context;
- role-based permissions;
- company-level data isolation.

## Authentication goals

The V2 authentication layer must support:

- login;
- logout;
- authenticated session;
- protected private routes;
- current user context;
- current company context;
- password hashing;
- user status validation;
- predictable behavior for demo environments.

## Suggested authentication strategy

The initial V2 should use a simple and safe authentication strategy before adding external providers.

Suggested approach:

- email and password login;
- hashed password stored in database;
- HTTP-only session cookie;
- server-side session validation;
- protected layout for private app routes;
- public routes kept available for landing, plans and demo pages.

External providers such as Google login can be evaluated later.

## Public routes

These routes can remain public:

- /
- /planos
- /demo
- /comece-agora

## Private routes

These routes must require authentication:

- /dashboard
- /empresa
- /clientes
- /veiculos
- /fornecedores
- /produtos
- /servicos
- /funcionarios
- /ordens-servico
- /patio
- /mobile/patio
- /historico-veiculo
- /financeiro
- /contas-pagar
- /contas-receber
- /comissoes
- /lembretes
- /financiamentos-gravames

## User model

The User entity should be linked to a Company.

Suggested fields:

- id
- companyId
- name
- email
- passwordHash
- role
- status
- lastLoginAt
- createdAt
- updatedAt

## User roles

Suggested roles:

### OWNER

Company owner.

Can:

- manage company data;
- manage users;
- access all modules;
- manage financial data;
- manage settings.

### ADMIN

Administrative user.

Can:

- access most operational modules;
- manage customers, vehicles, services and products;
- manage work orders;
- access financial modules if enabled.

### MANAGER

Operational manager.

Can:

- manage work orders;
- manage yard flow;
- view dashboards;
- view financial summaries depending on permission.

### OPERATOR

Operational user.

Can:

- create and update work orders;
- use yard/mobile yard;
- view customers and vehicles;
- register inspections.

## User statuses

Suggested statuses:

- ACTIVE
- INACTIVE
- BLOCKED
- INVITED

## Company model

The Company entity represents the tenant.

Suggested fields:

- id
- tradeName
- legalName
- document
- businessType
- city
- state
- phone
- email
- status
- plan
- createdAt
- updatedAt

Suggested statuses:

- ACTIVE
- INACTIVE
- SUSPENDED

Suggested plans:

- DEMO
- BASIC
- PRO
- ENTERPRISE

## Multi-company rule

Every business entity must include companyId.

Examples:

- Customer.companyId
- Vehicle.companyId
- Supplier.companyId
- Product.companyId
- Service.companyId
- Employee.companyId
- WorkOrder.companyId
- Inspection.companyId
- FinancialEntry.companyId
- Commission.companyId
- Reminder.companyId
- VehicleFinancing.companyId

## Data isolation rule

All database queries must be scoped by companyId.

A user from one company must never be able to access another company's data.

This applies to:

- list pages;
- detail pages;
- create actions;
- update actions;
- delete actions;
- dashboard counters;
- reports;
- API routes;
- future exports.

## Session payload

The authenticated session should expose only the minimum required data.

Suggested session payload:

- userId
- companyId
- role
- name
- email

Sensitive data must not be exposed to the browser unnecessarily.

## Route protection

Private routes must validate session before rendering operational data.

If the user is not authenticated:

- redirect to login;
- preserve intended destination when useful.

If the user is authenticated but inactive:

- deny access;
- show account status message.

## Permission strategy

V2 can start with role-based permissions.

Later, permissions can evolve into granular module-level access.

Initial permission groups:

- company management;
- user management;
- customer and vehicle management;
- work order management;
- inventory management;
- financial management;
- commission management;
- reports and dashboard;
- financing and lien management.

## Demo strategy

The public V1 localStorage demo can remain available separately.

For V2 SaaS demo, use a demo company and a demo user.

Suggested demo behavior:

- demo data seeded in PostgreSQL;
- demo user read/write allowed in isolated demo company;
- no access to real customer data;
- no external paid integrations enabled.

## Migration strategy

Authentication and multi-company support must be introduced before migrating operational modules to database persistence.

Recommended order:

1. Add Prisma schema for Company and User.
2. Add password hashing utilities.
3. Add login page.
4. Add logout action.
5. Add session utilities.
6. Add protected app layout.
7. Add current company context.
8. Add demo seed data.
9. Migrate company settings.
10. Migrate customers.
11. Continue module-by-module migration.

## Security requirements

Minimum requirements:

- passwords must be hashed;
- sessions must use secure cookies in production;
- private routes must require authentication;
- all business queries must use companyId;
- server actions/API routes must validate the current user;
- user input must be validated before persistence;
- no secrets must be exposed to the browser.

## What not to implement yet

Do not implement yet:

- Google login;
- WhatsApp integration;
- Pix;
- fiscal/NF-e;
- Resend operational workflows;
- billing/subscription automation;
- external vehicle/lien APIs.

These must wait until the core SaaS foundation is stable.

## Acceptance criteria

This planning step is complete when:

- authentication goals are documented;
- public and private routes are identified;
- user roles are defined;
- company isolation rules are defined;
- session payload is documented;
- migration order is documented;
- no functional code is changed.
