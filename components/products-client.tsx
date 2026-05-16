"use client";

import { useEffect, useState } from "react";
import { demoProducts } from "@/lib/demo-data";
import { calculateMargin, listProducts, StoredProduct } from "@/lib/browser-store";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatMargin(value: number) {
  return `${value.toFixed(1).replace(".", ",")}%`;
}

export function ProductsClient() {
  const [products, setProducts] = useState<StoredProduct[]>([]);

  useEffect(() => {
    setProducts(listProducts());
  }, []);

  const storedRows = products.map((product) => {
    const result = calculateMargin(product.costPrice, product.price);
    return [
      product.name,
      product.supplier || "Sem fornecedor",
      product.stock,
      product.costPrice,
      product.price,
      formatCurrency(result.profit),
      formatMargin(result.margin),
    ];
  });

  const demoRows = demoProducts.map((product) => {
    const costPrice = product.name.includes("Óleo") ? "R$ 30,00" : product.name.includes("Filtro") ? "R$ 18,00" : product.name.includes("Pastilha") ? "R$ 132,00" : "R$ 20,00";
    const result = calculateMargin(costPrice, product.price);
    return [
      product.name,
      product.name.includes("Óleo") ? "Distribuidora Óleo Max" : "Auto Peças Brasil",
      product.stock,
      costPrice,
      product.price,
      formatCurrency(result.profit),
      formatMargin(result.margin),
    ];
  });

  const rows = [...storedRows, ...demoRows];

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {['Produto', 'Fornecedor', 'Saldo', 'Custo', 'Venda', 'Lucro', 'Margem'].map((column) => (
                <th key={column} className="px-5 py-4 font-black">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`} className="hover:bg-slate-50">
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`} className="px-5 py-4 text-slate-700">
                    {cellIndex === 0 ? <span className="font-black text-slate-950">{cell}</span> : cellIndex === 6 ? <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{cell}</span> : cell}
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
