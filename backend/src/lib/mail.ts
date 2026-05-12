import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
  const { data, error } = await resend.emails.send({
    from: "HubSpot Tickets <onboarding@resend.dev>",
    to,
    subject,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}