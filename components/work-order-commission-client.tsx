"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createCommissionFromWorkOrder, findCommissionsByWorkOrderId, findWorkOrderById, getEmployeeCommissionRule, listEmployees, numberToCurrency, calculateCommissionAmount, StoredCommission, StoredEmployee, StoredWorkOrderTargetType } from "@/lib/browser-store";

type TargetType = "Serviço" | "Produto/peça" | "Lavagem";
const targetTypes: TargetType[] = ["Serviço", "Produto/peça", "Lavagem"];

export function WorkOrderCommissionClient({ workOrderId }: { workOrderId: string }) {
  const [commissions, setCommissions] = useState<StoredCommission[]>([]);
  const [order, setOrder] = useState<ReturnType<typeof findWorkOrderById> | undefined>(undefined);
  const [employees, setEmployees] = useState<StoredEmployee[]>([]);

  function reload() {
    setOrder(findWorkOrderById(workOrderId));
    setCommissions(findCommissionsByWorkOrderId(workOrderId));
    setEmployees(listEmployees());
  }

  useEffect(() => {
    reload();
  }, [workOrderId]);

  const employee = order?.responsibleEmployeeId ? employees.find((item) => item.id === order.responsibleEmployeeId) : undefined;

  function baseAmountFor(targetType: TargetType) {
    if (!order) return "R$ 0,00";
    if (targetType === "Produto/peça") return order.partsTotal || order.productSale || order.total;
    if (targetType === "Lavagem") return order.serviceSale || order.servicesTotal || order.total;
    return order.servicesTotal || order.serviceSale || order.total;
  }

  function targetNameFor(targetType: TargetType) {
    if (!order) return "";
    if (targetType === "Produto/peça") return order.product || "Produto/peça da OS";
    if (targetType === "Lavagem") return order.service || "Lavagem da OS";
    return order.service || "Serviço da OS";
  }

  function handleGenerate(targetType: TargetType) {
    createCommissionFromWorkOrder(workOrderId, targetType);
    reload();
  }

  if (!order) {
    return null;
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950">Comissões da OS</h2>
          <p className="mt-2 text-sm text-slate-600">Sugira comissões a partir do responsável e das regras cadastradas no funcionário.</p>
        </div>
        <Link href="/comissoes" className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-950 hover:bg-slate-50">Ver comissões</Link>
      </div>

      {!employee ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold text-amber-900">
          Esta OS ainda não possui funcionário responsável com regra de comissão. Defina o responsável na criação da OS para habilitar sugestões automáticas.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {targetTypes.map((targetType) => {
            const rule = getEmployeeCommissionRule(employee, targetType);
            const existing = commissions.find((commission) => commission.targetType === targetType && commission.employeeId === employee.id);
            const baseAmount = baseAmountFor(targetType);
            const preview = rule ? numberToCurrency(calculateCommissionAmount(baseAmount, rule.valueType, rule.value)) : "R$ 0,00";

            return (
              <div key={targetType} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-bold text-slate-500">{targetType}</p>
                <p className="mt-2 font-black text-slate-950">{targetNameFor(targetType)}</p>
                <p className="mt-2 text-sm font-semibold text-slate-600">Base: {baseAmount}</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">Regra: {rule ? `${rule.valueType} • ${rule.value}` : "Sem comissão"}</p>
                <p className="mt-3 text-2xl font-black text-slate-950">{existing?.calculatedAmount || preview}</p>
                {existing ? (
                  <Link href={`/comissoes/${existing.id}`} className="mt-4 inline-flex rounded-2xl bg-blue-100 px-4 py-3 text-sm font-black text-blue-700 hover:bg-blue-200">Abrir comissão</Link>
                ) : (
                  <button type="button" disabled={!rule} onClick={() => handleGenerate(targetType)} className="mt-4 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">
                    Gerar comissão
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
