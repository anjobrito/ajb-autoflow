export function FormCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

export function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input
        type={type}
        placeholder={placeholder}
        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white"
      />
    </label>
  );
}

export function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <select className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">
      {children}
    </button>
  );
}
