"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight, Building2, CheckCircle2, Gauge } from "lucide-react";
import { saveCompany } from "@/lib/browser-store";

function Input({ name, label, placeholder, type = "text" }: { name: string; label: string; placeholder: string; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input type={type} name={name} required placeholder={placeholder} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white" />
    </label>
  );
}

export default function ComeceAgoraPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    saveCompany({
      tradeName: String(formData.get("tradeName") ?? ""),
      legalName: String(formData.get("legalName") ?? ""),
      cnpj: String(formData.get("cnpj") ?? ""),
      businessType: String(formData.get("businessType") ?? ""),
      city: String(formData.get("city") ?? ""),
      state: String(formData.get("state") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
    });

    setSaved(true);
    setTimeout(() => router.push("/dashboard"), 900);
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6 py-8 text-white sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500">
              <Gauge className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">AJB AutoFlow</p>
              <p className="text-xs text-blue-100">by AJBSYSTEMS</p>
            </div>
          </a>
          <nav className="hidden items-center gap-3 sm:flex">
            <a href="/planos" className="rounded-full border border-white/20 px-5 py-2 text-sm font-bold text-white hover:bg-white/10">Planos</a>
            <a href="/dashboard" className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10">Painel demo</a>
          </nav>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[1fr_520px] lg:px-16">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-sm md:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500">
            <Building2 className="h-7 w-7" />
          </div>
          <h1 className="mt-8 text-4xl font-black leading-tight sm:text-5xl">Comece a controlar sua oficina ou lava-jato pelo celular.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">Cadastre sua empresa, organize clientes, veículos, estoque e ordens de serviço em uma plataforma simples.</p>

          <div className="mt-8 grid gap-4">
            {["Teste o painel em poucos minutos", "Cadastre clientes, veículos e serviços", "Avise o cliente quando o veículo estiver pronto", "Plano inicial de R$ 49,90/mês"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-sm font-bold text-slate-100">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                {item}
              </div>
            ))}
          </div>
          <a href="/planos" className="mt-8 inline-flex rounded-2xl border border-white/20 px-5 py-3 text-sm font-black text-white hover:bg-white/10">Comparar planos</a>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-bold text-blue-700">Cadastro rápido</p>
          <h2 className="mt-1 text-3xl font-black">Dados da empresa</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Esses dados configuram o tenant da empresa no AJB AutoFlow.</p>

          <div className="mt-6 grid gap-4">
            <Input name="tradeName" label="Nome fantasia" placeholder="Ex: Oficina do João" />
            <Input name="legalName" label="Razão social" placeholder="Ex: Oficina do João Ltda" />
            <div className="grid gap-4 md:grid-cols-2">
              <Input name="cnpj" label="CNPJ" placeholder="Ex: 12.345.678/0001-90" />
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Segmento
                <select name="businessType" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-blue-500 focus:bg-white">
                  <option>Oficina mecânica</option>
                  <option>Lava-jato</option>
                  <option>Estética automotiva</option>
                  <option>Autopeças</option>
                  <option>Centro automotivo</option>
                </select>
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input name="city" label="Cidade" placeholder="Ex: Araras" />
              <Input name="state" label="UF" placeholder="Ex: SP" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input name="phone" label="Telefone/WhatsApp" placeholder="Ex: (19) 99999-0000" />
              <Input name="email" label="E-mail" type="email" placeholder="Ex: contato@empresa.com" />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            {saved ? <span className="text-sm font-bold text-emerald-700">Empresa cadastrada!</span> : <span className="text-xs text-slate-500">Sem cartão no MVP demo.</span>}
            <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">
              Começar agora <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
