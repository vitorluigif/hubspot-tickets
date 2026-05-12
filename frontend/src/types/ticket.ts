export type TicketPriority = "LOW" | "MEDIUM" | "HIGH";

export interface HubSpotTicket {
  id: string;
  properties: {
    subject?: string;
    content?: string;
    hs_pipeline?: string;
    hs_pipeline_stage?: string;
    hs_ticket_priority?: TicketPriority;
    createdate?: string;
    hs_lastmodifieddate?: string;
  };
  url?: string;
}

export interface TicketsResponse {
  tickets: HubSpotTicket[];
}

export interface CreateTicketRequest {
  subject: string;
  content?: string;
  priority?: TicketPriority;
}

export interface CreateTicketResponse {
  ticket: HubSpotTicket;
}