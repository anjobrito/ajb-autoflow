const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const company = await prisma.company.upsert({
    where: { cnpj: "DEMO-AJB-AUTOFLOW" },
    update: {
      name: "Oficina Demo AutoFlow Ltda",
      tradeName: "AutoFlow Garage",
      businessType: "AUTO_REPAIR",
      email: "contato@ajbsystems.com.br",
      city: "Araras",
      state: "SP",
      subscriptionStatus: "TRIAL",
    },
    create: {
      name: "Oficina Demo AutoFlow Ltda",
      tradeName: "AutoFlow Garage",
      cnpj: "DEMO-AJB-AUTOFLOW",
      businessType: "AUTO_REPAIR",
      email: "contato@ajbsystems.com.br",
      city: "Araras",
      state: "SP",
      subscriptionStatus: "TRIAL",
    },
  });

  await prisma.subscription.upsert({
    where: { companyId: company.id },
    update: { plan: "START", status: "TRIAL", priceCents: 4990 },
    create: { companyId: company.id, plan: "START", status: "TRIAL", priceCents: 4990 },
  });

  console.log(`Seed concluido para ${company.tradeName || company.name}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
