import Image from "next/image";
import { Lock } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] lg:grid lg:grid-cols-2">
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-6 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
              <Lock size={22} />
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              HubSpot Tickets
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
              Gerencie e acompanhe seus tickets integrados com a HubSpot em uma
              interface moderna e intuitiva.
            </p>
          </div>

          <LoginForm />
        </div>
      </section>

      <section className="relative hidden overflow-hidden bg-[#ff7a59] lg:flex">
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1974&auto=format&fit=crop"
          alt="Team working"
          fill
          className="object-cover opacity-20"
          priority
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-sm">
              HubSpot Integration
            </div>
          </div>

          <div>
            <h2 className="max-w-lg text-5xl font-semibold leading-tight">
              Centralize seus tickets e acompanhe tudo em tempo real.
            </h2>

            <p className="mt-6 max-w-md text-lg text-white/80">
              Uma experiência moderna para gerenciamento de tickets integrada
              diretamente com a API da HubSpot.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}