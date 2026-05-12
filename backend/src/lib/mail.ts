import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  requireTLS: true,
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 15000,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
});

interface SendMailRequest {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail({ to, subject, html }: SendMailRequest) {
  const info = await transporter.sendMail({
    from: "HubSpot Tickets <sender@example.com>",
    to,
    subject,
    html,
  });

  return {
    previewUrl: nodemailer.getTestMessageUrl(info),
  };
}