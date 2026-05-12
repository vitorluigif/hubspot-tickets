import nodemailer from "nodemailer";

const account = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,

  auth: {
    user: account.user,
    pass: account.pass,
  },
});

interface SendMailRequest {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail({
  to,
  subject,
  html,
}: SendMailRequest) {
  const info = await transporter.sendMail({
    from: '"HubSpot Tickets" <no-reply@hubspot-tickets.com>',
    to,
    subject,
    html,
  });

  const previewUrl = nodemailer.getTestMessageUrl(info);

  return {
    previewUrl,
  };
}