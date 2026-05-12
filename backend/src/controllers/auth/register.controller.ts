import type { Request, Response } from "express";

import { RegisterService } from "../../services/auth/register.service.js";

export class RegisterController {
  async handle(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const registerService = new RegisterService();

      const user = await registerService.execute({
        name,
        email,
        password,
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Internal error",
      });
    }
  }
}