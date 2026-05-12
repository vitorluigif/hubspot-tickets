import type {
  CreateHubSpotTicketRequest,
  HubSpotTicket,
} from "../../@types/hubspot/index.js";

import { CreateTicketService } from "./create-tickets.service.js";
import { GetContactByEmailService } from "./get-contact-by-email.service.js";

interface CreateMyTicketServiceRequest extends CreateHubSpotTicketRequest {
  email: string;
}

export class CreateMyTicketService {
  async execute({
    email,
    subject,
    content,
    priority,
  }: CreateMyTicketServiceRequest): Promise<HubSpotTicket> {
    const getContactByEmailService = new GetContactByEmailService();
    const createTicketService = new CreateTicketService();

    const contact = await getContactByEmailService.execute(email);

    if (!contact) {
      throw new Error("Contact not found in HubSpot");
    }

    const createTicketData: {
      contactId: string;
      subject: string;
      content?: string;
      priority?: "LOW" | "MEDIUM" | "HIGH";
    } = {
      contactId: contact.id,
      subject,
    };

    if (content) {
      createTicketData.content = content;
    }

    if (priority) {
      createTicketData.priority = priority;
    }

    const ticket = await createTicketService.execute(createTicketData);

    return ticket;
  }
}