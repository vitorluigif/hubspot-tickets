import type { HubSpotContact } from "../../@types/hubspot/index.js";
import { hubspotApi } from "../../lib/hubspot.js";

export class GetContactByEmailService {
  async execute(email: string): Promise<HubSpotContact | null> {
    const response = await hubspotApi.post("/crm/v3/objects/contacts/search", {
      filterGroups: [
        {
          filters: [
            {
              propertyName: "email",
              operator: "EQ",
              value: email,
            },
          ],
        },
      ],
      properties: ["email", "firstname", "lastname"],
      limit: 1,
    });

    const contact = response.data.results?.[0];

    if (!contact) {
      return null;
    }

    return contact;
  }
}