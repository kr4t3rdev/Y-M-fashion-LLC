import Link from "next/link";
import { auth } from "@/auth";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { CartButton } from "@/components/shop/cart/cart-button";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { isStaff } from "@/server/application/roles";

const NAV_LINKS = [
  { no: "01", href: "/", label: "Inicio" },
  { no: "02", href: "/catalogo", label: "Catálogo" },
  { no: "03", href: "/combos", label: "Combos" },
  { no: "04", href: "/ofertas", label: "Ofertas" },
];

export async function SiteHeader() {
  const session = await auth();
  const isStaffRole = isStaff(session);
  const isCustomer = !!session?.user && !isStaffRole;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-hairline bg-background/85 backdrop-blur-md">
      {/* rail superior */}
      <div className="hidden border-b border-hairline lg:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="tag-no">
            ARCHIVO <span className="text-accent">·</span> EDICIÓN {new Date().getFullYear()}
          </p>
          <p className="tag-no">
            <span className="text-accent">●</span> ENVÍOS COORDINADOS <span className="text-accent">·</span> +1 737 268 9835
          </p>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <MobileMenu />
          <Link href="/" className="flex items-center gap-2 leading-none">
            <span className="brand text-lg tracking-[0.02em]">Y&M</span>
            <span className="hidden h-4 w-px bg-hairline sm:block" aria-hidden />
            <span className="hidden font-display text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              Fashion LLC
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-baseline gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <span className="price text-[0.625rem] font-medium text-accent">{link.no}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <CartButton />
          <ThemeToggle />
          {isStaffRole ? (
            <Link
              href="/admin"
              className="brand hidden h-10 items-center border border-primary bg-primary px-4 text-xs text-primary-foreground transition-colors hover:bg-foreground/90 md:inline-flex"
            >
              Dashboard
            </Link>
          ) : isCustomer ? (
            <SignOutButton />
          ) : (
            <Link
              href="/login"
              className="brand hidden h-10 items-center border border-border px-4 text-xs text-foreground transition-colors hover:border-accent hover:text-accent md:inline-flex"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
