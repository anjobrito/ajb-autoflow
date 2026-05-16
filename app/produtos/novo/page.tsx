"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { listSuppliers, saveProduct, StoredSupplier } from "@/lib/browser-store";

function Input({ name, label, placeholder }: { name: string; label: string; placeholder: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input name={name} required placeholder={placeholder} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" />
    </label>
  );
}

export default function NovoProdutoPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [suppliers, setSuppliers] = useState<StoredSupplier[]>([]);

  useEffect(() => {
    setSuppliers(listSuppliers());
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    saveProduct({
      name: String(formData.get("name") ?? ""),
      category: String(formData.get("category") ?? ""),
      supplier: String(formData.get("supplier") ?? ""),
      stock: String(formData.get("stock") ?? "0"),
      minStock: String(formData.get("minStock") ?? "0"),
      costPrice: String(formData.get("costPrice") ?? "R$ 0,00"),
      price: String(formData.get("price") ?? "R$ 0,00"),
    });

    setSaved(true);
    setTimeout(() => router.push("/produtos"), 700);
  }

  return (
    <AppShell>
      <PageHeader eyebrow="Novo item" title="Cadastrar produto" description="Cadastre fornecedor, custo, preço de venda e estoque para controlar margem." />
      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Input name="name" label="Nome do produto" placeholder="Ex: Óleo 5W30" />
          <Input name="category" label="Categoria" placeholder="Ex: Lubrificante" />
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Fornecedor
            <select name="supplier" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">
              <option>Sem fornecedor</option>
              {suppliers.map((supplier) => <option key={supplier.id}>{supplier.name}</option>)}
              <option>Auto Peças Brasil</option>
              <option>Distribuidora Óleo Max</option>
            </select>
          </label>
          <Input name="stock" label="Saldo atual" placeholder="Ex: 24" />
          <Input name="minStock" label="Estoque mínimo" placeholder="Ex: 6" />
          <Input name="costPrice" label="Preço de custo" placeholder="Ex: R$ 30,00" />
          <Input name="price" label="Preço de venda" placeholder="Ex: R$ 42,90" />
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          {saved ? <span className="text-sm font-bold text-emerald-700">Produto salvo!</span> : null}
          <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar item</button>
        </div>
      </form>
    </AppShell>
  );
}
