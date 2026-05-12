import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HubSpot Tickets",
  description: "HubSpot Tickets Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={geist.className}>{children}</body>
      <Toaster richColors position="top-right" duration={5000} />
    </html>
  );
}