"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

type UiModalProps = {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
};

export function UiModal({ open, title, description, children, onClose }: UiModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-blue-700">Cadastro</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{title}</h2>
            {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 p-3 text-slate-600 hover:bg-slate-50"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[calc(100vh-180px)] overflow-y-auto px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
