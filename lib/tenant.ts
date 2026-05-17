import { db } from "@/lib/db";

export const demoCompanyCnpj = "12.345.678/0001-90";

export async function getDemoCompanyId() {
  const company = await db.company.findUnique({
    where: { cnpj: demoCompanyCnpj },
    select: { id: true },
  });

  if (!company) {
    throw new Error("Empresa demo não encontrada. Execute `npm run prisma:seed` após a migração.");
  }

  return company.id;
}
