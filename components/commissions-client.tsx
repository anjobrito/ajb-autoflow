"use client";

import { useEffect, useMemo, useState } from "react";
import { listCommissions, StoredCommission } from "@/lib/browser-store";

const demoRows: StoredCommission[] = [
  {
    id: "demo-commission-service",
    employeeName: "Funcionário a definir",
    targetType: "Serviço",
    targetName: "Troca de óleo",
    valueType: "Percentual",
    value: "10%",
    status: "Ativa",
    notes: "Exemplo preparatório para serviços.",
    createdAt: "",
  },
  {
    id: "demo-commission-product",
    employeeName: "Funcionário a definir",
    targetType: "Produto/peça",
    targetName: "Filtro de óleo",
    valueType: "Valor fixo",
    value: "R$ 8,00",
    status: "Ativa",
    notes: "Exemplo preparatório para peças e produtos.",
    createdAt: "",
  },
  {
    id: "demo-commission-wash",
    employeeName: "Funcionário a definir",
    targetType: "Lavagem",
    targetName: "Lavagem completa",
    valueType: "Percentual",
    value: "12%",
    status: "Ativa",
    notes: "Exemplo preparatório para lava-jato.",
    createdAt: "",
  },
];

export function CommissionsClient() {
  const [commissions, setCommissions] = useState<StoredCommission[]>([]);

  useEffect(() => {
    setCommissions(listCommissions());
  }, []);

  const rows = useMemo(() => [...commissions, ...demoRows], [commissions]);
  const activeCount = rows.filter((commission) => commission.status === "Ativa").length;
  const serviceCount = rows.filter((commission) => commission.targetType === "Serviço").length;
  const productCount = rows.filter((commission) => commission.targetType === "Produto/peça").length;
  const washCount = rows.filter((commission) => commission.targetType === "Lavagem").length;

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Ativas", activeCount],
          ["Serviços", serviceCount],
          ["Produtos/peças", productCount],
          ["Lavagens", washCount],
        ].map(([label, value]) => (
          <div key={label} className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-5 text-sm font-semibold text-blue-900">
        As comissões estão preparadas para demonstração comercial e vínculo com funcionários cadastrados. O cálculo financeiro geral ainda não é alterado nesta fase do MVP.
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {["Funcionário", "Base", "Item", "Tipo", "Valor", "Status", "Observações"].map((column) => (
                  <th key={column} className="px-5 py-4 font-black">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((commission) => (
                <tr key={commission.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-black text-slate-950">{commission.employeeName || "Funcionário a definir"}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.targetType}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.targetName}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.valueType}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.value}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.status}</td>
                  <td className="px-5 py-4 text-slate-700">{commission.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
