import type { CreateUserData } from "../@types/user/index.js";
import { prisma } from "../lib/prisma.js";

export class UsersRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async create({ name, email, password }: CreateUserData) {
    return prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }
}