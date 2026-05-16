"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { saveService } from "@/lib/browser-store";

function Input({ name, label, placeholder }: { name: string; label: string; placeholder: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input name={name} required placeholder={placeholder} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" />
    </label>
  );
}

export default function NovoServicoPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    saveService({
      name: String(formData.get("name") ?? ""),
      category: String(formData.get("category") ?? ""),
      duration: String(formData.get("duration") ?? ""),
      price: String(formData.get("price") ?? "R$ 0,00"),
      status: "Ativo",
    });

    setSaved(true);
    setTimeout(() => router.push("/servicos"), 700);
  }

  return (
    <AppShell>
      <PageHeader eyebrow="Novo serviço" title="Cadastrar serviço" description="Cadastre serviços de oficina, lava-jato e estética automotiva." />
      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Input name="name" label="Nome do serviço" placeholder="Ex: Troca de óleo" />
          <Input name="category" label="Categoria" placeholder="Ex: Manutenção preventiva" />
          <Input name="duration" label="Tempo médio" placeholder="Ex: 45 min" />
          <Input name="price" label="Preço" placeholder="Ex: R$ 80,00" />
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          {saved ? <span className="text-sm font-bold text-emerald-700">Serviço salvo!</span> : null}
          <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Salvar serviço</button>
        </div>
      </form>
    </AppShell>
  );
}
