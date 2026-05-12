import type { CreateHubSpotTicketRequest, HubSpotTicket } from "../../@types/hubspot/index.js";
import { hubspotApi } from "../../lib/hubspot.js";

interface CreateTicketServiceRequest extends CreateHubSpotTicketRequest {
  contactId: string;
}

export class CreateTicketService {
  async execute({
    contactId,
    subject,
    content,
    priority = "MEDIUM",
  }: CreateTicketServiceRequest): Promise<HubSpotTicket> {
    const response = await hubspotApi.post("/crm/v3/objects/tickets", {
      properties: {
        subject,
        content,
        hs_pipeline: "0",
        hs_pipeline_stage: "2",
        hs_ticket_priority: priority,
      },
      associations: [
        {
          to: {
            id: contactId,
          },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: 16,
            },
          ],
        },
      ],
    });

    return response.data;
  }
}