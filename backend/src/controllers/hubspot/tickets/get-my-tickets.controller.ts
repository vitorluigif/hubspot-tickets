import type { Request, Response } from "express";

import { GetMyTicketsService } from "../../../services/hubspot/get-my-tickets.service.js";

export class GetMyTicketsController {
  async handle(req: Request, res: Response) {
    try {
      const getMyTicketsService = new GetMyTicketsService();

      const tickets = await getMyTicketsService.execute(req.user.email);

      return res.json({
        tickets,
      });
    } catch (error) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Internal error",
      });
    }
  }
}