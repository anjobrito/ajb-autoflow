# AJB AutoFlow V2 — Prisma/PostgreSQL Data Model Planning

## Product

AJB AutoFlow by AJBSYSTEMS

## Purpose

This document defines the initial Prisma/PostgreSQL data model planning for AJB AutoFlow V2.

The goal is to migrate the current V1 localStorage MVP to a real SaaS architecture with persistent database storage, authentication and company-level data isolation.

## Current baseline

The current V1 is a stable localStorage MVP. The V2 migration must preserve the existing business flows and visual layout while introducing database-backed persistence incrementally.

## Core SaaS entities

### Company

Represents a tenant/company using AJB AutoFlow.

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
- createdAt
- updatedAt

### User

Represents an authenticated user.

Suggested fields:

- id
- companyId
- name
- email
- passwordHash
- role
- status
- createdAt
- updatedAt

Suggested roles:

- OWNER
- ADMIN
- MANAGER
- OPERATOR

Suggested statuses:

- ACTIVE
- INACTIVE

## Operational entities

### Customer

Represents a customer of a company.

Suggested fields:

- id
- companyId
- name
- document
- phone
- email
- city
- state
- createdAt
- updatedAt

### Vehicle

Represents a vehicle linked to a customer.

Suggested fields:

- id
- companyId
- customerId
- plate
- brand
- model
- year
- mileage
- powertrain
- chassis
- createdAt
- updatedAt

Suggested powertrain values:

- FLEX
- GASOLINE
- ETHANOL
- DIESEL
- HYBRID
- ELECTRIC
- OTHER

### Supplier

Represents a supplier.

Suggested fields:

- id
- companyId
- name
- document
- phone
- email
- city
- state
- createdAt
- updatedAt

### Product

Represents a product, part or inventory item.

Suggested fields:

- id
- companyId
- supplierId
- name
- category
- stock
- minStock
- costPrice
- salePrice
- createdAt
- updatedAt

### Service

Represents a service offered by the company.

Suggested fields:

- id
- companyId
- name
- category
- duration
- price
- status
- createdAt
- updatedAt

Suggested statuses:

- ACTIVE
- INACTIVE

### Employee

Represents an employee, seller, mechanic or attendant.

Suggested fields:

- id
- companyId
- name
- document
- phone
- email
- role
- employmentType
- status
- serviceCommissionType
- serviceCommissionValue
- partCommissionType
- partCommissionValue
- washCommissionType
- washCommissionValue
- createdAt
- updatedAt

Suggested statuses:

- ACTIVE
- INACTIVE

## Work order entities

### WorkOrder

Represents a service order.

Suggested fields:

- id
- companyId
- code
- customerId
- vehicleId
- responsibleEmployeeId
- serviceId
- productId
- productQuantity
- productCost
- productSale
- serviceSale
- partsTotal
- servicesTotal
- total
- estimatedProfit
- estimatedMargin
- status
- notes
- startedAt
- finishedAt
- createdAt
- updatedAt

Suggested statuses:

- OPEN
- IN_PROGRESS
- READY_FOR_PICKUP
- COMPLETED
- CANCELLED

### Inspection

Represents an inspection/checklist linked to a work order.

Suggested fields:

- id
- companyId
- workOrderId
- vehicleId
- plate
- mileage
- fuelLevel
- hasDocuments
- hasSpareTire
- hasJack
- hasPersonalItems
- personalItems
- damages
- notes
- createdAt
- updatedAt

## Financial entities

### FinancialEntry

Represents a payable or receivable entry.

Suggested fields:

- id
- companyId
- type
- description
- category
- amount
- dueDate
- status
- paymentMethod
- personName
- reference
- settledAt
- notes
- createdAt
- updatedAt

Suggested types:

- PAYABLE
- RECEIVABLE

Suggested statuses:

- PENDING
- PAID
- RECEIVED
- OVERDUE
- CANCELLED

### Commission

Represents an employee commission.

Suggested fields:

- id
- companyId
- employeeId
- workOrderId
- financialEntryId
- employeeName
- targetType
- targetName
- valueType
- value
- baseAmount
- calculatedAmount
- status
- referenceDate
- paidAt
- notes
- createdAt
- updatedAt

Suggested target types:

- SERVICE
- PART
- WASH

Suggested value types:

- PERCENTAGE
- FIXED_AMOUNT
- NO_COMMISSION

Suggested statuses:

- PENDING
- PAID
- CANCELLED

## Reminder entity

### Reminder

Represents a reminder.

Suggested fields:

- id
- companyId
- customerId
- vehicleId
- type
- customerName
- plate
- dueDate
- channel
- message
- status
- createdAt
- updatedAt

Suggested statuses:

- PENDING
- SENT
- CANCELLED

## Future module entity

### VehicleFinancing

Represents the future Financiamentos e Gravames module.

This entity must be planned but not implemented in the first V2 migration step.

Suggested fields:

- id
- companyId
- customerId
- vehicleId
- sellerId
- branchId
- customerName
- customerDocument
- customerPhone
- vehicleBrand
- vehicleModel
- vehiclePlate
- vehicleChassis
- sellerName
- branchName
- bankName
- contractNumber
- requestedAmount
- financedAmount
- downPayment
- expectedReturnAmount
- receivedReturnAmount
- insuranceAmount
- financingStatus
- lienStatus
- externalCheckStatus
- notes
- createdAt
- updatedAt

## Multi-company rule

Every business entity must include companyId.

All queries must be filtered by companyId.

No company must access data from another company.

## Migration approach

The migration must be incremental:

1. Add Prisma schema.
2. Add database connection.
3. Add seed data.
4. Add authentication.
5. Add company context.
6. Migrate one module at a time.
7. Keep V1 localStorage behavior available until each module is replaced safely.

## Acceptance criteria

- All current V1 entities are represented.
- companyId is present in business entities.
- enum candidates are documented.
- relationships are planned before code changes.
- no functional code is changed in this step.
