import { Calendar, ExternalLink, Ticket } from "lucide-react";

import type { HubSpotTicket, TicketPriority } from "@/types/ticket";

interface TicketCardProps {
  ticket: HubSpotTicket;
}

const priorityLabel: Record<TicketPriority, string> = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
};

const priorityClass: Record<TicketPriority, string> = {
  LOW: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  MEDIUM: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  HIGH: "bg-red-500/10 text-red-300 border-red-500/20",
};

const iconClass: Record<TicketPriority, string> = {
  LOW: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  MEDIUM: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  HIGH: "bg-red-500/10 text-red-300 border-red-500/20",
};

export function TicketCard({ ticket }: TicketCardProps) {
  const priority = ticket.properties.hs_ticket_priority ?? "MEDIUM";

  return (
    <article className="group rounded-3xl border border-white/10 bg-[#0d1527] p-5 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-[#ff7a59]/40">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${iconClass[priority]}`}
        >
          <Ticket size={20} />
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${priorityClass[priority]}`}
        >
          {priorityLabel[priority]}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-white">
        {ticket.properties.subject ?? "Ticket sem título"}
      </h3>

      <p className="mt-4 line-clamp-3 min-h-16 text-sm leading-relaxed text-zinc-400">
        {ticket.properties.content ?? "Sem descrição informada."}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300">
          Pipeline {ticket.properties.hs_pipeline ?? "-"}
        </span>

        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300">
          Etapa {ticket.properties.hs_pipeline_stage ?? "-"}
        </span>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400">
        <Calendar size={16} />
        {ticket.properties.createdate
          ? new Date(ticket.properties.createdate).toLocaleDateString("pt-BR")
          : "Sem data"}
      </div>

      {ticket.url && (
        <a
          href={ticket.url}
          target="_blank"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#ff7a59] transition hover:text-[#ff9b82]"
        >
          Abrir na HubSpot
          <ExternalLink size={16} />
        </a>
      )}
    </article>
  );
}