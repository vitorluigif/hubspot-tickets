import type { HubSpotTicket } from "@/types/ticket";

import { TicketCard } from "./ticket-card";

interface TicketsListProps {
  tickets: HubSpotTicket[];
}

export function TicketsList({ tickets }: TicketsListProps) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-12 text-center">
        <h3 className="text-xl font-semibold text-white">
          Nenhum ticket encontrado
        </h3>
        <p className="mt-3 text-sm text-zinc-500">
          Ajuste os filtros ou crie um novo ticket para começar.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}