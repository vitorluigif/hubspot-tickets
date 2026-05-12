import { Router } from "express";

import { RegisterController } from "../controllers/auth/register.controller.js";
import { LoginController } from "../controllers/auth/login.controller.js";
import { MeController } from "../controllers/auth/me.controller.js";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated.js";
import { VerifyTwoFactorCodeController } from "../controllers/auth/verify-two-factor-code.controller.js";

const authRoutes = Router();

const registerController = new RegisterController();
const loginController = new LoginController();
const meController = new MeController();
const verifyTwoFactorCodeController = new VerifyTwoFactorCodeController();

authRoutes.post("/register", registerController.handle);
authRoutes.post("/login", loginController.handle);

authRoutes.get(
  "/me",
  ensureAuthenticated, // Middleware
  meController.handle
);

authRoutes.post("/verify-2fa", verifyTwoFactorCodeController.handle);

export { authRoutes };