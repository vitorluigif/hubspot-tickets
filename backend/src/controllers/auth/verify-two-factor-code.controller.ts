import type { Request, Response } from "express";

import { VerifyTwoFactorCodeService } from "../../services/auth/verify-two-factor-code.service.js";

export class VerifyTwoFactorCodeController {
  async handle(req: Request, res: Response) {
    try {
      const { userId, code } = req.body;

      if (!userId || !code) {
        return res.status(400).json({
          error: "User ID and code are required",
        });
      }

      const verifyTwoFactorCodeService = new VerifyTwoFactorCodeService();

      const result = await verifyTwoFactorCodeService.execute({
        userId,
        code,
      });

      return res.json(result);
    } catch (error) {
      return res.status(401).json({
        error: error instanceof Error ? error.message : "Internal error",
      });
    }
  }
}