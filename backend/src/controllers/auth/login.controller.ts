import type { Request, Response } from "express";

import { LoginService } from "../../services/auth/login.service.js";

export class LoginController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const loginService = new LoginService();

      const result = await loginService.execute({
        email,
        password,
      });

      return res.json(result);
    } catch (error) {
      return res.status(401).json({
        error: error instanceof Error ? error.message : "Internal error",
      });
    }
  }
}