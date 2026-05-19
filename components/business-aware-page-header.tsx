"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getCompany } from "@/lib/browser-store";
import { getBusinessProfileByLabel } from "@/lib/business-types";

type BusinessAwarePageHeaderProps = {
  context: "dashboard" | "operations";
};

export function BusinessAwarePageHeader({ context }: BusinessAwarePageHeaderProps) {
  const [businessType, setBusinessType] = useState("Completo / Multioperação");

  useEffect(() => {
    function refreshBusinessType() {
      setBusinessType(getCompany().businessType || "Completo / Multioperação");
    }

    refreshBusinessType();
    window.addEventListener("storage", refreshBusinessType);
    window.addEventListener("ajb-company-updated", refreshBusinessType);

    return () => {
      window.removeEventListener("storage", refreshBusinessType);
      window.removeEventListener("ajb-company-updated", refreshBusinessType);
    };
  }, []);

  const profile = useMemo(() => getBusinessProfileByLabel(businessType), [businessType]);
  const isDashboard = context === "dashboard";

  const title = isDashboard ? `Dashboard ${profile.label}` : profile.operationPluralLabel;
  const eyebrow = isDashboard ? "Visão executiva adaptativa" : profile.kanbanLabel;
  const description = isDashboard
    ? `Acompanhe os principais indicadores para o universo operacional de ${profile.label}: ${profile.dashboardCards.slice(0, 3).join(", ")}.`
    : `Gerencie ${profile.operationPluralLabel.toLowerCase()} usando o fluxo sugerido para ${profile.label}: ${profile.kanbanStatuses.join(" → ")}.`;
  const actionLabel = isDashboard ? `Novo ${profile.operationLabel}` : `Novo ${profile.operationLabel}`;

  return (
    <header className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-blue-700">{eyebrow}</p>
          <h1 className="mt-1 text-3xl font-black">{title}</h1>
          <p className="mt-2 text-slate-600">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.kanbanStatuses.slice(0, 6).map((status) => (
              <span key={status} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{status}</span>
            ))}
          </div>
        </div>
        <Link href="/ordens-servico/nova" className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white hover:bg-blue-700">
          {actionLabel}
        </Link>
      </div>
    </header>
  );
}
