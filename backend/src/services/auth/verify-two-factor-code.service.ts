import jwt from "jsonwebtoken";

import { prisma } from "../../lib/prisma.js";

interface VerifyTwoFactorCodeRequest {
  userId: string;
  code: string;
}

export class VerifyTwoFactorCodeService {
  async execute({ userId, code }: VerifyTwoFactorCodeRequest) {
    const twoFactorCode = await prisma.twoFactorCode.findFirst({
      where: {
        userId,
        code,
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    if (!twoFactorCode) {
      throw new Error("Invalid or expired 2FA code");
    }

    await prisma.twoFactorCode.update({
      where: {
        id: twoFactorCode.id,
      },
      data: {
        usedAt: new Date(),
      },
    });

    const token = jwt.sign(
      {
        sub: twoFactorCode.user.id,
        email: twoFactorCode.user.email,
        name: twoFactorCode.user.name,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
      user: {
        id: twoFactorCode.user.id,
        name: twoFactorCode.user.name,
        email: twoFactorCode.user.email,
      },
    };
  }
}