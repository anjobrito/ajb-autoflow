export function PageHeader({
  eyebrow,
  title,
  description,
  actionLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
}) {
  return (
    <header className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-blue-700">{eyebrow}</p>
          <h1 className="mt-1 text-3xl font-black">{title}</h1>
          <p className="mt-2 text-slate-600">{description}</p>
        </div>
        {actionLabel ? (
          <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">
            {actionLabel}
          </button>
        ) : null}
      </div>
    </header>
  );
}
