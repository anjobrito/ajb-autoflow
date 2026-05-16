"use client";

import { useEffect, useState } from "react";
import { demoCustomers } from "@/lib/demo-data";
import { listCustomers, StoredCustomer } from "@/lib/browser-store";

export function CustomersClient() {
  const [customers, setCustomers] = useState<StoredCustomer[]>([]);

  useEffect(() => {
    setCustomers(listCustomers());
  }, []);

  const rows = [
    ...customers.map((customer) => [customer.name, customer.phone, customer.email, `${customer.city}/${customer.state}`, "Novo cadastro"]),
    ...demoCustomers.map((customer) => [customer.name, customer.phone, customer.email, `${customer.city}/${customer.state}`, "Demo"]),
  ];

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {['Cliente', 'Telefone', 'E-mail', 'Cidade', 'Origem'].map((column) => (
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
