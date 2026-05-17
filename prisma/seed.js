const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.company.upsert({
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
      subscriptionStatus: "TRIAL"
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
