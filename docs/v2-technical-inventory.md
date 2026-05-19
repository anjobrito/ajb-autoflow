# AJB AutoFlow V2 — Technical Inventory

## Product

AJB AutoFlow by AJBSYSTEMS

## Current baseline

The current V1 is a localStorage-based MVP, published as a demonstrable version and documented as the stable baseline before the SaaS migration.

## Purpose

This document maps the current V1 technical structure before starting the V2 migration to Prisma, PostgreSQL, authentication and real multi-company isolation.

## Current V1 modules

- Landing page
- Plans
- Demo
- Company registration
- Dashboard
- Customers
- Vehicles
- Suppliers
- Products and stock
- Services
- Employees
- Work orders
- Work order detail
- Inspection/checklist
- Yard/Kanban
- Mobile yard
- Vehicle history
- Financial dashboard
- Accounts payable
- Accounts receivable
- Commissions
- Reminders

## Current persistence

The current MVP uses browser localStorage through client-side storage helpers.

Main storage responsibilities include:

- Company data
- Customers
- Vehicles
- Suppliers
- Employees
- Products
- Services
- Work orders
- Inspections
- Reminders
- Commissions
- Financial entries

## Migration risk areas

The highest-risk areas for V2 migration are:

- lib/browser-store.ts
- components/app-shell.tsx
- lib/select-options.ts
- work order flow
- financial entries
- commissions
- customer and vehicle relationships
- employee/responsible person relationship
- dashboard counters
- localStorage compatibility during transition

## V2 migration principles

- Do not break the V1 localStorage demo.
- Do not migrate everything at once.
- Keep the current visual layout.
- Keep forms and tables consistent.
- Keep enum fields as selects.
- Introduce Prisma and PostgreSQL incrementally.
- Introduce authentication before exposing private data.
- Introduce company isolation before treating the product as real SaaS.
- Keep AJB AutoFlow by AJBSYSTEMS positioning.

## Suggested migration order

1. Company
2. User and authentication
3. Customers
4. Vehicles
5. Suppliers
6. Products
7. Services
8. Employees
9. Work orders
10. Inspections
11. Yard/Kanban
12. Vehicle history
13. Financial entries
14. Accounts payable
15. Accounts receivable
16. Commissions
17. Reminders

## Acceptance criteria for this inventory

- Current V1 modules are listed.
- Current localStorage dependency is explicit.
- Migration risks are documented.
- Suggested migration order is defined.
- No functional code is changed.
