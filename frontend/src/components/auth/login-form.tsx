"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { login, verify2FA } from "@/services/auth.service";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("felipe@tropicalhub.co");
  const [password, setPassword] = useState("123456");
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState("");
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const data = await login({ email, password });

      setUserId(data.userId);
      setStep("2fa");

      toast.success("Código 2FA enviado!", {
        description: "Abra o link de preview para visualizar o código.",
        duration: 10000,
      });
    } catch {
      toast.error("E-mail ou senha inválidos.", {
        description: "Verifique suas credenciais e tente novamente.",
        duration: 10000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerify2FA(event: FormEvent) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const data = await verify2FA({
        userId,
        code,
      });

      localStorage.setItem("hubspot_tickets_token", data.token);
      localStorage.setItem("hubspot_tickets_user", JSON.stringify(data.user));

      toast.success("Código 2FA enviado!", {
        description: "Verifique seu e-mail para continuar.",
        duration: 10000,
      });

      router.push("/tickets");
    } catch {
      toast.error("Código inválido ou expirado.", {
        description: "Verifique o código enviado e tente novamente.",
        duration: 10000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (step === "2fa") {
    return (
      <form
        onSubmit={handleVerify2FA}
        className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="space-y-4">
          <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm text-orange-800">
            Código enviado para validação. Em ambiente dev, abra o preview do
            e-mail para consultar o código.
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-800">
              Código 2FA
            </label>

            <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-3 focus-within:border-zinc-900">
              <ShieldCheck size={18} className="text-zinc-400" />
              <input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                maxLength={6}
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Digite o código de 6 dígitos"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Validando..." : "Validar código"}
          </button>

          <button
            type="button"
            onClick={() => setStep("credentials")}
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            Voltar
          </button>
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleLogin}
      className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-800">
            E-mail
          </label>

          <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-3 focus-within:border-zinc-900">
            <Mail size={18} className="text-zinc-400" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-transparent text-sm outline-none"
              placeholder="seu@email.com"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-800">
            Senha
          </label>

          <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-3 focus-within:border-zinc-900">
            <Lock size={18} className="text-zinc-400" />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-transparent text-sm outline-none"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Enviando código..." : "Entrar"}
        </button>
      </div>
    </form>
  );
}