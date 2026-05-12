import type { Request, Response } from "express";

import { CreateMyTicketService } from "../../../services/hubspot/create-my-ticket.service.js";

export class CreateTicketController {
  async handle(req: Request, res: Response) {
    try {
      const { subject, content, priority } = req.body;

      if (!subject) {
        return res.status(400).json({
          error: "Subject is required",
        });
      }

      const createMyTicketService = new CreateMyTicketService();

      const ticket = await createMyTicketService.execute({
        email: req.user.email,
        subject,
        content,
        priority,
      });

      return res.status(201).json({
        ticket,
      });
    } catch (error) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Internal error",
      });
    }
  }
}