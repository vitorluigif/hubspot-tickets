import type { HubSpotTicket } from "../../@types/hubspot/index.js";
import { hubspotApi } from "../../lib/hubspot.js";

export class GetTicketDetailsService {
  async execute(ticketId: string): Promise<HubSpotTicket> {
    const response = await hubspotApi.get(
      `/crm/v3/objects/tickets/${ticketId}`,
      {
        params: {
          properties: [
            "subject",
            "content",
            "hs_pipeline",
            "hs_pipeline_stage",
            "hs_ticket_priority",
            "createdate",
            "hs_lastmodifieddate",
          ].join(","),
        },
      }
    );

    return response.data;
  }
}