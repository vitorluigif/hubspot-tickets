"use client";

import { FormEvent, useState } from "react";
import { createTicket } from "@/services/tickets.service";
import type { HubSpotTicket, TicketPriority } from "@/types/ticket";
import { toast } from "sonner";

interface CreateTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (ticket: HubSpotTicket) => void;
}

export function CreateTicketDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateTicketDialogProps) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("MEDIUM");
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateTicket(event: FormEvent) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await createTicket({ subject, content, priority });

      onCreated(response.ticket);
      toast.success("Ticket criado com sucesso!", {
        description: "O ticket foi criado e associado ao contato na HubSpot.",
        duration: 10000,
      });
      setSubject("");
      setContent("");
      setPriority("MEDIUM");
      onOpenChange(false);
    } catch {
      toast.error("Não foi possível criar o ticket.", {
        description: "Tente novamente em alguns instantes.",
        duration: 10000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-zinc-950">Criar ticket</h2>
          <p className="mt-2 text-sm text-zinc-600">
            O ticket será criado e associado automaticamente ao contato na
            HubSpot.
          </p>
        </div>

        <form onSubmit={handleCreateTicket} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-800">
              Título
            </label>
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              required
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-black outline-none focus:border-zinc-900"
              placeholder="Ex: Problema no acesso"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-800">
              Descrição
            </label>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="min-h-28 w-full resize-none rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-black outline-none focus:border-zinc-900"
              placeholder="Descreva o problema ou solicitação"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-800">
              Prioridade
            </label>
            <select
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as TicketPriority)
              }
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-black outline-none focus:border-zinc-900"
            >
              <option value="LOW">Baixa</option>
              <option value="MEDIUM">Média</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60"
            >
              {isLoading ? "Criando..." : "Criar ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
