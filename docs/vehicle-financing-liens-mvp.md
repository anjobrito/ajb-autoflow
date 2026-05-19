cat > docs/vehicle-financing-liens-mvp.md <<'EOF'
# Vehicle Financing and Liens MVP

## Product

AJB AutoFlow by AJBSYSTEMS

## Module

Financiamentos e Gravames

## Status

First MVP integrated into the main branch.

## Strategic context

The Vehicle Financing and Liens module expands AJB AutoFlow beyond workshops, car washes, detailing shops and automotive service operations.

This module introduces support for vehicle dealerships, used car lots, garages and vehicle resale businesses that currently manage financing and lien control manually through spreadsheets.

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
- manual financing/lien registration;
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
- `lib/vehicle-financing-store.ts`
- `components/app-shell.tsx`

## Current route

```txt
/financiamentos-gravames