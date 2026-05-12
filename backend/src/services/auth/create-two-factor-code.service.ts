import { prisma } from "../../lib/prisma.js";
import { sendMail } from "../../lib/mail.js";
import { UsersRepository } from "../../repositories/user.repository.js";

export class CreateTwoFactorCodeService {
  async execute(userId: string) {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.twoFactorCode.create({
      data: {
        userId,
        code,
        expiresAt,
      },
    });

    await sendMail({
      to: user.email,
      subject: "Seu código de verificação",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px;">
          <h2>HubSpot Tickets</h2>
          <p>Olá${user.name ? `, ${user.name}` : ""}.</p>
          <p>Use o código abaixo para concluir seu login:</p>
          <strong style="display: block; font-size: 32px; margin: 24px 0;">
            ${code}
          </strong>
          <p>Este código expira em 10 minutos.</p>
        </div>
      `,
    });

    return {
      expiresAt,
    };
  }
}