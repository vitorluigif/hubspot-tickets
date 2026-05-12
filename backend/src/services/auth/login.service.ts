import bcrypt from "bcrypt";

import { UsersRepository } from "../../repositories/user.repository.js";
import { CreateTwoFactorCodeService } from "./create-two-factor-code.service.js";

import type { LoginRequest } from "../../@types/auth/index.js";

export class LoginService {
  async execute({ email, password }: LoginRequest) {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const createTwoFactorCodeService = new CreateTwoFactorCodeService();

    const twoFactor = await createTwoFactorCodeService.execute(user.id);

    return {
      requires2FA: true,
      userId: user.id,
      expiresAt: twoFactor.expiresAt,
    };
  }
}