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

    let previewUrl: string | false | undefined;

    try {
      const mail = await sendMail({
        to: user.email,
        subject: "Seu código de verificação",
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>HubSpot Tickets</h2>

            <p>Seu código de verificação:</p>

            <strong style="font-size: 32px;">
              ${code}
            </strong>

            <p>Expira em 10 minutos.</p>
          </div>
        `,
      });

      previewUrl = mail.previewUrl;
    } catch (error) {
      console.error("2FA email send failed:", error);
    }

    return {
      code,
      expiresAt,
      previewUrl,
    };
  }
}
