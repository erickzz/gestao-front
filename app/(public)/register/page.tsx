"use client";

import { useRouter } from "next/navigation";
import { BackButton } from "@/components/auth/back-button"
import { RegisterForm } from "@/components/auth/register-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"

export default function RegisterPage() {
  const router = useRouter();

  async function handleRegister(credentials: {
    name: string;
    email: string;
    password: string;
  }) {
    const { error } = await authClient.signUp.email({
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
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
              Criar conta
            </CardTitle>
            <CardDescription>Comece a controlar suas finanças</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm onRegister={handleRegister} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
