import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Crear cuenta — Y&M Fashion",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex items-baseline justify-center gap-2">
            <span className="brand text-3xl">Y&M</span>
            <span className="font-display text-base uppercase tracking-[0.2em] text-muted-foreground">
              Fashion LLC
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Crea tu cuenta para finalizar pedidos</p>
        </div>
        <div className="border border-hairline bg-card p-6 shadow-sm">
          <RegisterForm />
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Tu cuenta debe ser activada por el administrador antes de poder pedir.
        </p>
      </div>
    </div>
  );
}
