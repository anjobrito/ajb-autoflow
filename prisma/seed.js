const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const company = await prisma.company.upsert({
    where: { cnpj: "DEMO-AJB-AUTOFLOW" },
    update: {},
    create: {
      name: "Oficina Demo AutoFlow Ltda",
      tradeName: "AutoFlow Garage",
      cnpj: "DEMO-AJB-AUTOFLOW",
      businessType: "AUTO_REPAIR",
      email: "contato@ajbsystems.com.br",
      city: "Araras",
      state: "SP",
      subscriptionStatus: "TRIAL",
      subscription: { create: { plan: "START", status: "TRIAL", priceCents: 4990 } },
    },
  });

  await prisma.financialEntry.deleteMany({ where: { companyId: company.id } });
  await prisma.commission.deleteMany({ where: { companyId: company.id } });
  await prisma.inspection.deleteMany({ where: { companyId: company.id } });
  await prisma.workOrderItem.deleteMany({ where: { workOrder: { companyId: company.id } } });
  await prisma.workOrder.deleteMany({ where: { companyId: company.id } });
  await prisma.product.deleteMany({ where: { companyId: company.id } });
  await prisma.service.deleteMany({ where: { companyId: company.id } });
  await prisma.employee.deleteMany({ where: { companyId: company.id } });
  await prisma.supplier.deleteMany({ where: { companyId: company.id } });
  await prisma.vehicle.deleteMany({ where: { companyId: company.id } });
  await prisma.customer.deleteMany({ where: { companyId: company.id } });

  const customer = await prisma.customer.create({ data: { companyId: company.id, name: "Cliente Demo", city: "Araras", state: "SP" } });
  const vehicle = await prisma.vehicle.create({ data: { companyId: company.id, customerId: customer.id, plate: "ABC1D23", brand: "Volkswagen", model: "Gol 1.6", year: 2018, mileage: 84500, powertrain: "Combustão" } });
  const supplier = await prisma.supplier.create({ data: { companyId: company.id, name: "Fornecedor Demo Autopeças", city: "Araras", state: "SP" } });
  const employee = await prisma.employee.create({ data: { companyId: company.id, name: "Mecânico Demo", role: "Mecânico", employmentType: "CLT", status: "ACTIVE" } });
  const product = await prisma.product.create({ data: { companyId: company.id, supplierId: supplier.id, name: "Óleo 5W30 Sintético", category: "Lubrificantes", costPrice: 32.9, salePrice: 59.9, currentStock: 24, minStock: 6, active: true } });
  const service = await prisma.service.create({ data: { companyId: company.id, name: "Troca de óleo", category: "Mecânica preventiva", duration: "40 minutos", price: 89.9, active: true } });

  const workOrder = await prisma.workOrder.create({
    data: {
      companyId: company.id,
      customerId: customer.id,
      vehicleId: vehicle.id,
      responsibleEmployeeId: employee.id,
      code: "OS-2001",
      status: "OPEN",
      description: "Troca de óleo e inspeção preventiva.",
      notes: "Seed inicial do AJB V1-04.",
      totalParts: 59.9,
      totalServices: 89.9,
      totalAmount: 149.8,
      estimatedProfit: 116.9,
      estimatedMargin: 78.04,
      items: {
        create: [
          { productId: product.id, description: "Óleo 5W30 Sintético", quantity: 1, unitCost: 32.9, unitPrice: 59.9, totalCost: 32.9, totalPrice: 59.9 },
          { serviceId: service.id, description: "Troca de óleo", quantity: 1, unitCost: 0, unitPrice: 89.9, totalCost: 0, totalPrice: 89.9 },
        ],
      },
    },
  });

  await prisma.inspection.create({ data: { companyId: company.id, workOrderId: workOrder.id, vehicleId: vehicle.id, plate: vehicle.plate, mileage: vehicle.mileage, fuelLevel: "1/2", hasDocuments: true, hasSpareTire: true, hasJack: true, hasPersonalItems: false, damages: ["Pequeno risco no para-choque dianteiro"], notes: "Checklist criado pelo seed." } });
  await prisma.commission.create({ data: { companyId: company.id, employeeId: employee.id, workOrderId: workOrder.id, targetType: "SERVICE", targetName: "Troca de óleo", valueType: "PERCENTAGE", value: 10, status: "PENDING", notes: "Comissão demo sobre serviço." } });
  await prisma.financialEntry.create({ data: { companyId: company.id, workOrderId: workOrder.id, type: "RECEIVABLE", description: "Recebimento OS-2001", category: "Serviços automotivos", amount: 149.8, dueDate: new Date(), status: "PENDING", paymentMethod: "Pix", notes: "Conta a receber gerada pelo seed." } });
  await prisma.financialEntry.create({ data: { companyId: company.id, type: "PAYABLE", description: "Compra de óleo para estoque", category: "Estoque", amount: 32.9, dueDate: new Date(), status: "PENDING", paymentMethod: "Boleto", notes: "Conta a pagar gerada pelo seed." } });

  console.log(`Seed concluído para empresa ${company.tradeName || company.name}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
