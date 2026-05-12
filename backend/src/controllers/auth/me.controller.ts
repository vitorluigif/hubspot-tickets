import type { Request, Response } from "express";

export class MeController {
  async handle(req: Request, res: Response) {
    return res.json({
      user: req.user,
    });
  }
}