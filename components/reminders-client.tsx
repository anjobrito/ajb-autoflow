"use client";

import { useEffect, useState } from "react";
import { CalendarClock, Mail, MessageCircle } from "lucide-react";
import { getBusinessProfile } from "@/lib/business-profile";
import { getCompany, listReminders, StoredCompany, StoredReminder } from "@/lib/browser-store";

const workshopRows = [
  ["Troca de óleo", "João Pereira", "ABC1D23", "15/06/2026", "E-mail", "Demo"],
  ["Revisão de freios", "Maria Souza", "BRA2E44", "01/07/2026", "E-mail", "Demo"],
  ["Filtro e revisão preventiva", "Carlos Lima", "CAR9F10", "20/07/2026", "WhatsApp futuro", "Demo"],
];

const carwashRows = [
  ["Lavagem mensal", "Carlos Lima", "CAR9F10", "22/05/2026", "WhatsApp futuro", "Demo"],
  ["Higienização interna", "Ana Martins", "AIB7S20", "10/06/2026", "SMS futuro", "Demo"],
  ["Lavagem completa", "João Pereira", "ABC1D23", "30/05/2026", "E-mail", "Demo"],
];

const partsRows = [
  ["Reposição de filtros", "João Pereira", "ABC1D23", "15/06/2026", "E-mail", "Demo"],
  ["Compra recorrente de óleo", "Maria Souza", "BRA2E44", "01/07/2026", "WhatsApp futuro", "Demo"],
  ["Pastilhas de freio", "Carlos Lima", "CAR9F10", "20/07/2026", "E-mail", "Demo"],
];

function formatDate(value: string) {
  if (!value) return "Sem data";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

export function RemindersClient() {
  const [company, setCompany] = useState<StoredCompany | null>(null);
  const [reminders, setReminders] = useState<StoredReminder[]>([]);

  useEffect(() => {
    setCompany(getCompany());
    setReminders(listReminders());
  }, []);

  const profile = getBusinessProfile(company ?? getCompany());
  const demoRows = profile.kind === "carwash" ? carwashRows : profile.kind === "parts" ? partsRows : workshopRows;
  const savedRows = reminders.map((reminder) => [reminder.type, reminder.customer, reminder.plate, formatDate(reminder.dueDate), reminder.channel, reminder.status]);
  const rows = [...savedRows, ...demoRows];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <CalendarClock className="h-7 w-7 text-blue-700" />
          <p className="mt-4 text-sm text-slate-500">Tipo de operação</p>
          <p className="mt-2 text-2xl font-black">{profile.operationLabel}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <Mail className="h-7 w-7 text-blue-700" />
          <p className="mt-4 text-sm text-slate-500">Canal atual</p>
          <p className="mt-2 text-2xl font-black">E-mail</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <MessageCircle className="h-7 w-7 text-blue-700" />
          <p className="mt-4 text-sm text-slate-500">Futuro</p>
          <p className="mt-2 text-2xl font-black">WhatsApp</p>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm font-bold text-blue-300">Mensagem automática sugerida</p>
        <p className="mt-3 text-xl font-black">{profile.customerReturnMessage}</p>
        <p className="mt-3 text-sm leading-6 text-slate-300">Essa mensagem muda conforme o tipo de negócio configurado em Empresa.</p>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-xl font-black">{profile.reminderTitle}</h2>
          <p className="mt-2 text-sm text-slate-600">{profile.reminderDescription}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {['Lembrete', 'Cliente', 'Placa', 'Vencimento', 'Canal', 'Status'].map((column) => (
                  <th key={column} className="px-5 py-4 font-black">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row, rowIndex) => (
                <tr key={`${row[0]}-${rowIndex}`} className="hover:bg-slate-50">
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`} className="px-5 py-4 text-slate-700">
                      {cellIndex === 0 ? <span className="font-black text-slate-950">{cell}</span> : cellIndex === 5 ? <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{cell}</span> : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
