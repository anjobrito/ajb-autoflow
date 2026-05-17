import { db } from "@/lib/db";

export const demoCompanyCnpj = "DEMO-AJB-AUTOFLOW";

export async function getDemoCompanyId() {
  const company = await db.company.findUnique({
    where: { cnpj: demoCompanyCnpj },
    select: { id: true },
  });

  if (!company) {
    throw new Error("Empresa demo não encontrada na base PostgreSQL.");
  }

  return company.id;
}
