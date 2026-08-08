"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Zap } from "lucide-react";

type Theme = "light" | "dark" | "street";
const CYCLE: Theme[] = ["light", "dark", "street"];
const ICON: Record<Theme, typeof Sun> = { light: Sun, dark: Moon, street: Zap };
const LABEL: Record<Theme, string> = {
  light: "Cambiar a modo oscuro",
  dark: "Cambiar a modo street",
  street: "Cambiar a modo claro",
};

function readTheme(root: HTMLElement | null): Theme {
  if (!root) return "light";
  if (root.classList.contains("street")) return "street";
  if (root.classList.contains("dark")) return "dark";
  return "light";
}

export function ThemeToggle() {
  // El script inline del head aplica la clase de tema antes del primer render
  // del cliente, así que el inicializador lazy lee el tema real.
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document === "undefined" ? "light" : readTheme(document.documentElement),
  );

  // Aplica el tema al <html> y lo persiste; fuente de verdad tras hidratar.
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark", "street");
    if (theme !== "light") html.classList.add(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const cycle = () => {
    setTheme((t) => CYCLE[(CYCLE.indexOf(t) + 1) % CYCLE.length]);
  };

  const Icon = ICON[theme];

  return (
    <button
      onClick={cycle}
      aria-label={LABEL[theme]}
      className="rounded-md border border-border p-2.5 text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
    >
      <Icon className="size-4" />
    </button>
  );
}
