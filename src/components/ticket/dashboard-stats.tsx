import { CheckCircle, Ticket, TrendingUp } from "lucide-react";

import type { HubSpotTicket } from "@/types/ticket";

interface DashboardStatsProps {
  tickets: HubSpotTicket[];
}

export function DashboardStats({ tickets }: DashboardStatsProps) {
  const total = tickets.length;
  const resolved = tickets.filter(
    (ticket) => ticket.properties.hs_pipeline_stage === "4",
  ).length;
  const open = total - resolved;

  const stats = [
    {
      label: "Total de tickets",
      value: total,
      description: "Todos os seus tickets",
      icon: Ticket,
      className: "from-[#ff7a59] to-[#ff4f64]",
    },
    {
      label: "Em andamento",
      value: open,
      description: "Tickets abertos",
      icon: TrendingUp,
      className: "from-violet-500 to-indigo-600",
    },
    {
      label: "Resolvidos",
      value: resolved,
      description: "Tickets finalizados",
      icon: CheckCircle,
      className: "from-emerald-500 to-green-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20"
          >
            <div
              className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.className}`}
            >
              <Icon size={24} />
            </div>

            <p className="text-sm text-zinc-400">{stat.label}</p>
            <strong className="mt-1 block text-4xl font-semibold">
              {stat.value}
            </strong>
            <p className="mt-3 text-xs text-zinc-500">{stat.description}</p>
          </div>
        );
      })}
    </div>
  );
}
