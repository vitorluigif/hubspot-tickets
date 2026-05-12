import { GetContactByEmailService } from "./get-contact-by-email.service.js";
import { GetContactTicketsService } from "./get-contact-tickets.service.js";
import { GetTicketDetailsService } from "./get-ticket-details.service.js";

export class GetMyTicketsService {
  async execute(email: string) {
    const getContactByEmailService = new GetContactByEmailService();
    const getContactTicketsService = new GetContactTicketsService();
    const getTicketDetailsService = new GetTicketDetailsService();

    const contact = await getContactByEmailService.execute(email);

    if (!contact) {
      throw new Error("Contact not found in HubSpot");
    }

    const ticketIds = await getContactTicketsService.execute(contact.id);

    const tickets = await Promise.all(
      ticketIds.map((ticketId) =>
        getTicketDetailsService.execute(ticketId)
      )
    );

    return tickets;
  }
}