"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { getMyTickets } from "@/services/tickets.service";
import type { HubSpotTicket, TicketPriority } from "@/types/ticket";
import { CreateTicketDialog } from "@/components/ticket/create-ticket-dialog";
import { DashboardSidebar } from "@/components/ticket/dashboard-sidebar";
import { DashboardStats } from "@/components/ticket/dashboard-stats";
import { TicketsList } from "@/components/ticket/ticket-list";
import { Menu, Ticket } from "lucide-react";
import { toast } from "sonner";

interface StoredUser {
  id: string;
  name: string | null;
  email: string;
}

export default function TicketsPage() {
  const router = useRouter();

  const [tickets, setTickets] = useState<HubSpotTicket[]>([]);
  const [user, setUser] = useState<StoredUser | null>(null);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | "ALL">(
    "ALL",
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("hubspot_tickets_token");
    const storedUser = localStorage.getItem("hubspot_tickets_user");

    if (!token) {
      router.push("/login");
      return;
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    async function loadTickets() {
      try {
        const data = await getMyTickets();
        setTickets(data.tickets);
      } catch {
        toast.error("Não foi possível carregar os tickets.", {
          description: "Verifique sua conexão ou tente novamente.",
          duration: 10000,
        });

        setError("Não foi possível carregar os tickets.");
      } finally {
        setIsLoading(false);
      }
    }

    loadTickets();
  }, [router]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const subject = ticket.properties.subject?.toLowerCase() ?? "";
      const content = ticket.properties.content?.toLowerCase() ?? "";
      const priority = ticket.properties.hs_ticket_priority ?? "MEDIUM";

      const matchesSearch =
        subject.includes(search.toLowerCase()) ||
        content.includes(search.toLowerCase());

      const matchesPriority =
        priorityFilter === "ALL" || priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [tickets, search, priorityFilter]);

  function handleTicketCreated(ticket: HubSpotTicket) {
    setTickets((state) => [ticket, ...state]);
  }

  function handleLogout() {
    localStorage.removeItem("hubspot_tickets_token");
    localStorage.removeItem("hubspot_tickets_user");
    router.push("/login");
  }

  return (
    <main className="h-screen overflow-hidden bg-[#070b16] text-white">
      <div className="flex min-h-screen">
        <DashboardSidebar
          user={user}
          onLogout={handleLogout}
          onCreateTicket={() => setIsCreateTicketOpen(true)}
          isMobileOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <section className="h-screen flex-1 overflow-hidden lg:ml-72">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-2">
              <Ticket size={18} className="text-[#ff7a59]" />
              <span className="font-semibold">HubSpot Tickets</span>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300"
            >
              Sair
            </button>
          </div>
          <div className="mx-auto flex h-[calc(100vh-73px)] max-w-[1800px] flex-col px-4 py-5 sm:px-6 lg:h-screen lg:px-8 lg:py-8">
            <div className="mb-6 hidden justify-end lg:flex">
              <button
                onClick={handleLogout}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-zinc-200 transition hover:bg-white/10"
              >
                Sair
              </button>
            </div>

            <div className="mb-6 grid gap-6 lg:mb-10 lg:grid-cols-[1fr_720px] lg:items-end">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#ff7a59]">
                  Bem-vindo de volta{user?.name ? `, ${user.name}` : ""}
                </p>

                <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Meus Tickets
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base lg:text-lg">
                  Acompanhe, filtre e gerencie seus tickets vinculados ao
                  contato autenticado na HubSpot.
                </p>
              </div>

              <DashboardStats tickets={tickets} />
            </div>

            <div className="flex min-h-0 flex-1 flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-6 lg:rounded-[2rem] lg:p-8">
              <div className="mb-6 flex flex-col justify-between gap-4 lg:mb-8 xl:flex-row xl:items-center">
                <h2 className="text-2xl font-semibold">Tickets recentes</h2>

                <div className="grid gap-3 sm:grid-cols-2 xl:flex">
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Buscar tickets..."
                    className="h-12 rounded-2xl border border-white/10 bg-[#0c1222] px-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#ff7a59]"
                  />

                  <select
                    value={priorityFilter}
                    onChange={(event) =>
                      setPriorityFilter(
                        event.target.value as TicketPriority | "ALL",
                      )
                    }
                    className="h-12 rounded-2xl border border-white/10 bg-[#0c1222] px-4 text-sm text-white outline-none focus:border-[#ff7a59]"
                  >
                    <option value="ALL">Todas</option>
                    <option value="LOW">Baixa</option>
                    <option value="MEDIUM">Média</option>
                    <option value="HIGH">Alta</option>
                  </select>

                  <button
                    onClick={() => setIsCreateTicketOpen(true)}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#ff7a59] px-5 text-sm font-semibold text-white transition hover:bg-[#ff6845]"
                  >
                    Novo ticket
                  </button>
                </div>
              </div>

              {isLoading && (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-64 animate-pulse rounded-3xl bg-white/5"
                    />
                  ))}
                </div>
              )}

              {error && (
                <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-200">
                  {error}
                </div>
              )}

              {!isLoading && !error && (
                <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                  <TicketsList tickets={filteredTickets} />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <CreateTicketDialog
        open={isCreateTicketOpen}
        onOpenChange={setIsCreateTicketOpen}
        onCreated={handleTicketCreated}
      />
    </main>
  );
}
