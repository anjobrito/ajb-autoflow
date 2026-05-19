"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { UiModal } from "@/components/ui-modal";
import { demoProducts } from "@/lib/demo-data";
import { calculateMargin, listProducts, listSuppliers, saveProduct, StoredProduct, StoredSupplier } from "@/lib/browser-store";
import { productCategories } from "@/lib/select-options";

const inputClass = "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white";
const labelClass = "grid gap-2 text-sm font-bold text-slate-700";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatMargin(value: number) {
  return `${value.toFixed(1).replace(".", ",")}%`;
}

export function ProductsClient() {
  const [products, setProducts] = useState<StoredProduct[]>([]);
  const [suppliers, setSuppliers] = useState<StoredSupplier[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  function refresh() {
    setProducts(listProducts());
    setSuppliers(listSuppliers());
  }

  useEffect(() => {
    refresh();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    saveProduct({
      name: String(formData.get("name") ?? ""),
      category: String(formData.get("category") ?? ""),
      supplier: String(formData.get("supplier") ?? ""),
      stock: String(formData.get("stock") ?? "0"),
      minStock: String(formData.get("minStock") ?? "0"),
      costPrice: String(formData.get("costPrice") ?? "R$ 0,00"),
      price: String(formData.get("price") ?? "R$ 0,00"),
    });

    form.reset();
    refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
    setIsFormOpen(false);
  }

  const storedRows = products.map((product) => {
    const result = calculateMargin(product.costPrice, product.price);
    return [product.name, product.supplier || "Sem fornecedor", product.stock, product.costPrice, product.price, formatCurrency(result.profit), formatMargin(result.margin)];
  });

  const demoRows = demoProducts.map((product) => {
    const costPrice = product.name.includes("Óleo") ? "R$ 30,00" : product.name.includes("Filtro") ? "R$ 18,00" : product.name.includes("Pastilha") ? "R$ 132,00" : "R$ 20,00";
    const result = calculateMargin(costPrice, product.price);
    return [product.name, product.name.includes("Óleo") ? "Distribuidora Óleo Max" : "Auto Peças Brasil", product.stock, costPrice, product.price, formatCurrency(result.profit), formatMargin(result.margin)];
  });

  const rows = [...storedRows, ...demoRows];

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-blue-700">Cadastro</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">Itens cadastrados</h2>
          <p className="mt-2 text-sm text-slate-600">Cadastre produtos em modal e mantenha a tela principal focada em estoque e margem.</p>
        </div>
        <button type="button" onClick={() => setIsFormOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Novo item
        </button>
      </div>

      {saved ? <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">Produto salvo!</div> : null}

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{['Produto', 'Fornecedor', 'Saldo', 'Custo', 'Venda', 'Lucro', 'Margem'].map((column) => <th key={column} className="px-5 py-4 font-black">{column}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row, rowIndex) => (
                <tr key={`${row[0]}-${rowIndex}`} className="hover:bg-slate-50">
                  {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className="px-5 py-4 text-slate-700">{cellIndex === 0 ? <span className="font-black text-slate-950">{cell}</span> : cellIndex === 6 ? <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{cell}</span> : cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UiModal open={isFormOpen} title="Cadastrar produto" description="Cadastre fornecedor, custo, preço de venda e estoque para controlar margem." onClose={() => setIsFormOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>Nome do produto<input name="name" required placeholder="Ex: Óleo 5W30" className={inputClass} /></label>
            <label className={labelClass}>Categoria<select name="category" className={inputClass}>{productCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className={labelClass}>Fornecedor<select name="supplier" className={inputClass}><option>Sem fornecedor</option>{suppliers.map((supplier) => <option key={supplier.id}>{supplier.name}</option>)}<option>Auto Peças Brasil</option><option>Distribuidora Óleo Max</option></select></label>
            <label className={labelClass}>Saldo atual<input name="stock" required inputMode="numeric" placeholder="Ex: 24" className={inputClass} /></label>
            <label className={labelClass}>Estoque mínimo<input name="minStock" required inputMode="numeric" placeholder="Ex: 6" className={inputClass} /></label>
            <label className={labelClass}>Preço de custo<input name="costPrice" required inputMode="decimal" placeholder="Ex: R$ 30,00" className={inputClass} /></label>
            <label className={labelClass}>Preço de venda<input name="price" required inputMode="decimal" placeholder="Ex: R$ 42,90" className={inputClass} /></label>
          </div>
          <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setIsFormOpen(false)} className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">Cancelar</button><button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar item</button></div>
        </form>
      </UiModal>
    </div>
  );
}
