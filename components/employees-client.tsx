"use client";

import { useEffect, useState } from "react";
import { listEmployees, StoredEmployee } from "@/lib/browser-store";

export function EmployeesClient() {
  const [employees, setEmployees] = useState<StoredEmployee[]>([]);

  useEffect(() => {
    setEmployees(listEmployees());
  }, []);

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {["Funcionário", "Telefone", "E-mail", "Cargo/função", "Vínculo", "Status"].map((column) => (
                <th key={column} className="px-5 py-4 font-black">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm font-semibold text-slate-500">
                  Nenhum funcionário cadastrado ainda. Cadastre a equipe para organizar atendimento, operação e futuras comissões.
                </td>
              </tr>
            ) : employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <span className="font-black text-slate-950">{employee.name}</span>
                  <p className="mt-1 text-xs font-semibold text-slate-500">CPF: {employee.cpf || "Não informado"}</p>
                </td>
                <td className="px-5 py-4 text-slate-700">{employee.phone}</td>
                <td className="px-5 py-4 text-slate-700">{employee.email || "Não informado"}</td>
                <td className="px-5 py-4 text-slate-700">{employee.role}</td>
                <td className="px-5 py-4 text-slate-700">{employee.employmentType}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{employee.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
