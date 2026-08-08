"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "./nav-links";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        className="rounded-md border-2 border-foreground/25 p-2.5 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
      >
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
      </button>

      {open && (
        <div className="fixed inset-0 top-16 z-50 flex flex-col bg-background">
          <nav aria-label="Menú" className="flex-1 overflow-y-auto">
            <ul className="flex flex-col px-4 sm:px-6">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href} className="border-b-2 border-hairline last:border-0">
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-baseline justify-between gap-3 py-5 ${
                        active ? "opacity-100" : ""
                      }`}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className={`slash text-sm ${active ? "!text-foreground" : ""}`}>
                          {link.no}
                        </span>
                        <span
                          className={`brand-display text-4xl transition-colors group-hover:text-accent ${
                            active ? "text-accent" : "text-foreground"
                          }`}
                        >
                          {link.label}
                        </span>
                      </span>
                      <span className="text-2xl text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent">
                        {active ? "◀" : "↗"}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="border-t-2 border-hairline px-4 py-4 sm:px-6">
            <p className="tag-no">
              ENVÍOS COORDINADOS <span className="slash">/</span> +1 737 268 9835
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
