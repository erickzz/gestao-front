"use client";

import { useRouter } from "next/navigation";
import { BackButton } from "@/components/auth/back-button"
import { LoginForm } from "@/components/auth/login-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(credentials: { email: string; password: string; rememberMe: boolean }) {
    const { error } = await authClient.signIn.email({
      email: credentials.email,
      password: credentials.password,
      rememberMe: credentials.rememberMe,
      callbackURL: `${window.location.origin}/home`,
    });
    if (error) return error;
    router.push("/home");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="absolute left-6 top-6 z-10">
        <BackButton />
      </div>
      <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle
              className="text-2xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Entrar
            </CardTitle>
            <CardDescription>Acesse sua conta Fintra</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm onLogin={handleLogin} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
