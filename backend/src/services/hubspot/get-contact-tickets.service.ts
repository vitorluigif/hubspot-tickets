import type { AssociationResult } from "../../@types/hubspot/index.js";
import { hubspotApi } from "../../lib/hubspot.js";

export class GetContactTicketsService {
  async execute(contactId: string): Promise<string[]> {
    const response = await hubspotApi.get(
      `/crm/v4/objects/contacts/${contactId}/associations/tickets`
    );

    const results = response.data.results ?? [];

    return results
      .map((item: AssociationResult) => {
        return item.to?.id ?? String(item.toObjectId);
      })
      .filter(Boolean);
  }
}