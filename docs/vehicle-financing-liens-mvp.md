# Vehicle Financing and Liens MVP

## Product

AJB AutoFlow by AJBSYSTEMS

## Module

Financiamentos e Gravames

## Status

First MVP integrated into the main branch.

This document describes the current MVP scope, the implementation boundaries and the future evolution path for the Vehicle Financing and Liens module.

## Strategic context

The Vehicle Financing and Liens module expands AJB AutoFlow beyond workshops, car washes, detailing shops, auto parts stores and automotive service operations.

This module introduces support for vehicle dealerships, used car lots, garages and vehicle resale businesses that currently manage financing and lien control manually through spreadsheets.

The first MVP intentionally keeps the implementation simple and localStorage-based, following the current V1 architecture and avoiding premature SaaS infrastructure changes.

## Goal

Provide an internal operational module to control:

- financing contracts;
- banks and financial institutions;
- customers;
- vehicles;
- sellers;
- branches;
- financed amounts;
- down payments;
- expected financial return;
- received financial return;
- prestamista insurance;
- financing status;
- lien status;
- operational notes.

## Current MVP scope

The current MVP includes:

- route `/financiamentos-gravames`;
- sidebar menu entry;
- page using the current AppShell and PageHeader pattern;
- client-side module component;
- localStorage persistence;
- dashboard cards;
- manual financing and lien registration;
- record editing;
- record deletion;
- quick search;
- financing status filter;
- lien status filter;
- contract table;
- enum fields as selects.

## Files added or changed

- `app/financiamentos-gravames/page.tsx`
- `components/vehicle-financing-client.tsx`
- `components/app-shell.tsx`
- `lib/vehicle-financing-store.ts`

## Current route

```txt
/financiamentos-gravames
```

## Current storage key

```txt
ajb-autoflow-vehicle-financings
```

## Financing statuses

The MVP uses controlled financing status values exposed as select options.

Current expected status group:

- draft / simulation;
- pending approval;
- approved;
- rejected;
- contract signed;
- released / completed;
- cancelled.

The exact source of truth is the `financingStatusOptions` list in `lib/vehicle-financing-store.ts`.

## Lien statuses

The MVP uses controlled lien status values exposed as select options.

Current expected status group:

- not requested;
- pending;
- registered;
- released;
- issue / blocked;
- cancelled.

The exact source of truth is the `lienStatusOptions` list in `lib/vehicle-financing-store.ts`.

## Dashboard indicators

The initial dashboard gives the user a quick operational view of the financing and lien portfolio.

Expected indicators include:

- total registered contracts;
- active or in-progress financing records;
- pending lien records;
- completed or released records;
- expected financial return;
- received financial return.

## Search and filters

The current MVP supports quick search and status-based filtering.

Search can be used to locate records by operational fields such as:

- customer;
- vehicle;
- plate;
- contract;
- bank / financial institution;
- seller;
- branch.

Filters are available for:

- financing status;
- lien status.

## What is not implemented yet

The first MVP does not include:

- integration with existing customer records;
- integration with existing vehicle records;
- integration with existing employee / seller records;
- integration with accounts receivable;
- integration with commissions;
- import from CSV or XLSX;
- export to PDF or XLSX;
- timeline / audit history by vehicle;
- external API consultation for liens, restrictions, plate, chassis or ownership data;
- Prisma;
- PostgreSQL;
- authentication;
- multi-company isolation;
- Resend;
- WhatsApp;
- Pix;
- fiscal / invoice integrations.

## Future phases

### Phase 2 — Internal data integration

Integrate the module with existing AJB AutoFlow records using selects or comboboxes where appropriate.

Expected targets:

- customers;
- vehicles;
- employees / sellers;
- branches.

### Phase 3 — Vehicle history and timeline

Add financing and lien events to the vehicle history, allowing the user to inspect the operational timeline of each vehicle.

### Phase 4 — Financial integration

Connect financial return fields to accounts receivable and evaluate seller commission rules.

### Phase 5 — Spreadsheet import

Add controlled CSV/XLSX import to help businesses migrate from manual spreadsheets into AJB AutoFlow.

### Phase 6 — External API integrations

Evaluate integrations for vehicle, plate, chassis, lien and restriction checks.

External APIs must be added only after the MVP flow is stable and after the V2 SaaS architecture is ready for secure credentials, audit logs and company isolation.

## V2 / SaaS considerations

When AJB AutoFlow migrates from localStorage to the V2 SaaS architecture, this module should become part of the centralized Prisma/PostgreSQL model.

Expected considerations:

- every financing record must belong to a company;
- records should be isolated by `companyId`;
- users should only access companies they are authorized to operate;
- external API credentials must not be stored in client-side code;
- sensitive financial information should require authenticated access;
- record changes should be auditable;
- future imports should validate duplicates and data consistency.

## Acceptance criteria

This MVP is accepted when:

- `/financiamentos-gravames` is accessible from the app menu;
- records can be created, edited and deleted;
- records persist in localStorage;
- dashboard indicators update from stored records;
- financing status fields use select options;
- lien status fields use select options;
- quick search works for operational lookup;
- status filters work independently;
- the visual pattern remains consistent with the existing AJB AutoFlow UI;
- no Prisma/PostgreSQL/Auth/external API integration is introduced in this phase.

## Decision

The Vehicle Financing and Liens module is accepted as a first MVP integrated into AJB AutoFlow.

It is not the final complete module. It is the first operational layer required to validate the business vertical for vehicle dealerships, garages and used car lots before deeper integrations are introduced.
