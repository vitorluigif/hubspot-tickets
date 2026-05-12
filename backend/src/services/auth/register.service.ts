import bcrypt from "bcrypt";

import { UsersRepository } from "../../repositories/user.repository.js";
import type { RegisterRequest } from "../../@types/auth/index.js";

export class RegisterService {
  async execute({ name, email, password }: RegisterRequest) {
    const usersRepository = new UsersRepository();

    const userAlreadyExists = await usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}