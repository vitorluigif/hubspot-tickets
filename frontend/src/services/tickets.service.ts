import { api } from "@/services/api";

import type {
  CreateTicketRequest,
  CreateTicketResponse,
  TicketsResponse,
} from "@/types/ticket";

function getAuthHeaders() {
  const token = localStorage.getItem("hubspot_tickets_token");

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function getMyTickets() {
  const response = await api.get<TicketsResponse>("/tickets/me", {
    headers: getAuthHeaders(),
  });

  return response.data;
}

export async function createTicket(data: CreateTicketRequest) {
  const response = await api.post<CreateTicketResponse>("/tickets", data, {
    headers: getAuthHeaders(),
  });

  return response.data;
}