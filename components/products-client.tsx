"use client";

import { useEffect, useState } from "react";
import { demoProducts } from "@/lib/demo-data";
import { listProducts, StoredProduct } from "@/lib/browser-store";

export function ProductsClient() {
  const [products, setProducts] = useState<StoredProduct[]>([]);

  useEffect(() => {
    setProducts(listProducts());
  }, []);

  const rows = [
    ...products.map((product) => [product.name, product.category, product.stock, product.minStock, product.price]),
    ...demoProducts.map((product) => [product.name, product.category, product.stock, product.minStock, product.price]),
  ];

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {['Produto', 'Categoria', 'Saldo', 'Mínimo', 'Preço'].map((column) => (
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
