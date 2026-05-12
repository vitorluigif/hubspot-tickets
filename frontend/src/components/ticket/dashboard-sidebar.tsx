import { LogOut, PlusCircle, Ticket, X } from "lucide-react";

interface StoredUser {
  id: string;
  name: string | null;
  email: string;
}

interface DashboardSidebarProps {
  user: StoredUser | null;
  onLogout: () => void;
  onCreateTicket: () => void;
  isMobileOpen?: boolean;
  onClose?: () => void;
}

export function DashboardSidebar({
  user,
  onLogout,
  onCreateTicket,
  isMobileOpen = false,
  onClose,
}: DashboardSidebarProps) {
  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "U";

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-72 border-r border-white/10 bg-[#08101f] p-6
          transition-transform duration-300
          lg:translate-x-0
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="mb-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff7a59]">
              <Ticket size={22} />
            </div>

            <div>
              <strong className="text-lg">HubSpot</strong>
              <span className="ml-1 text-lg font-semibold text-[#ff7a59]">
                Tickets
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 p-2 text-zinc-400 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="space-y-3">
          <button
            onClick={onClose}
            className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-left text-sm font-medium text-white"
          >
            <Ticket size={18} className="text-[#ff7a59]" />
            Meus Tickets
          </button>

          <button
            onClick={() => {
              onCreateTicket();
              onClose?.();
            }}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
          >
            <PlusCircle size={18} />
            Novo Ticket
          </button>
        </nav>

        <div className="mt-auto border-t border-white/10 pt-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff7a59] to-[#ff4f64] font-semibold">
              {initials}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {user?.name ?? "Usuário"}
              </p>
              <p className="truncate text-xs text-zinc-500">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/5"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
