"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV_LINKS = [
  { no: "01", href: "/", label: "Inicio" },
  { no: "02", href: "/catalogo", label: "Catálogo" },
  { no: "03", href: "/combos", label: "Combos" },
  { no: "04", href: "/ofertas", label: "Ofertas" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
      {NAV_LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`group relative flex items-baseline gap-2 border-2 px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] transition-colors ${
              active
                ? "border-accent bg-accent text-accent-foreground"
                : "border-transparent text-muted-foreground hover:border-foreground/20 hover:bg-secondary hover:text-foreground"
            }`}
          >
            <span className={`slash text-xs ${active ? "!text-accent-foreground/70" : ""}`}>
              {link.no}
            </span>
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
