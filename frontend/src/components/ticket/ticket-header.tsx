interface TicketsHeaderProps {
  total: number;
  userName?: string | null;
}

export function TicketsHeader({ total, userName }: TicketsHeaderProps) {
  return (
    <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="text-sm font-medium text-[#ff7a59]">HubSpot Tickets</p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-950">
          Meus Tickets
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
          {userName ? `Olá, ${userName}. ` : ""}
          Acompanhe seus tickets vinculados ao contato autenticado na HubSpot.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm">
        <p className="text-xs text-zinc-500">Total de tickets</p>
        <strong className="text-2xl text-zinc-950">{total}</strong>
      </div>
    </header>
  );
}
