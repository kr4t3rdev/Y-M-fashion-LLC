import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect(session.user.role === "usuario" ? "/" : "/admin");

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Volver a la tienda
        </Link>
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex items-baseline justify-center gap-2">
            <span className="brand text-3xl">Y&M</span>
            <span className="font-display text-base uppercase tracking-[0.2em] text-muted-foreground">
              Fashion LLC
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Accede al archivo · Inicia sesión en tu cuenta</p>
        </div>
        <div className="border border-hairline bg-card p-6 shadow-sm">
          <LoginForm />
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          El acceso al panel de administración requiere una cuenta de gestor o administrador.
        </p>
      </div>
    </div>
  );
}
