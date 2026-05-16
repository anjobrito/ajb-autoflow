"use client";

import { useEffect, useState } from "react";
import { listSuppliers, StoredSupplier } from "@/lib/browser-store";

const demoRows = [
  ["Auto Peças Brasil", "12.111.222/0001-33", "(19) 3333-1000", "compras@pecasbrasil.com", "Araras/SP"],
  ["Distribuidora Óleo Max", "44.555.666/0001-77", "(19) 3333-2000", "vendas@oleomax.com", "Limeira/SP"],
];

export function SuppliersClient() {
  const [suppliers, setSuppliers] = useState<StoredSupplier[]>([]);

  useEffect(() => {
    setSuppliers(listSuppliers());
  }, []);

  const rows = [
    ...suppliers.map((supplier) => [supplier.name, supplier.document, supplier.phone, supplier.email, `${supplier.city}/${supplier.state}`]),
    ...demoRows,
  ];

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[840px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {['Fornecedor', 'CNPJ', 'Telefone', 'E-mail', 'Cidade'].map((column) => (
                <th key={column} className="px-5 py-4 font-black">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`} className="hover:bg-slate-50">
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`} className="px-5 py-4 text-slate-700">
                    {cellIndex === 0 ? <span className="font-black text-slate-950">{cell}</span> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
