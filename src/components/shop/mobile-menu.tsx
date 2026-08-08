"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { no: "01", href: "/", label: "Inicio" },
  { no: "02", href: "/catalogo", label: "Catálogo" },
  { no: "03", href: "/combos", label: "Combos" },
  { no: "04", href: "/ofertas", label: "Ofertas" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        className="rounded-md border border-border p-2.5 text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
      >
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
      </button>
      {open && (
        <nav
          aria-label="Menú"
          className="absolute left-0 right-0 top-16 z-50 border-b border-hairline bg-background/95 backdrop-blur-md"
        >
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-hairline last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between gap-3 py-4"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="price text-xs text-accent">{link.no}</span>
                    <span className="font-display text-lg font-medium tracking-tight">
                      {link.label}
                    </span>
                  </span>
                  <span className="tag-no">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
