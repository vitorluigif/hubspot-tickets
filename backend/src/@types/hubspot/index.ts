export interface HubSpotContact {
  id: string;
  properties: {
    email?: string;
    firstname?: string;
    lastname?: string;
  };
}

export interface AssociationResult {
  toObjectId?: number;
  to?: {
    id: string;
  };
}

export interface TicketProperties {
  subject?: string;
  content?: string;
  hs_pipeline?: string;
  hs_pipeline_stage?: string;
  hs_ticket_priority?: string;
  createdate?: string;
  hs_lastmodifieddate?: string;
}

export interface HubSpotTicket {
  id: string;
  properties: TicketProperties;
}

export interface CreateHubSpotTicketRequest {
  subject: string;
  content?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
}