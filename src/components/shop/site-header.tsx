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
    <header className="sticky top-0 z-40 w-full border-b-2 border-foreground/15 bg-background">
      {/* rail superior — ticket de envío */}
      <div className="hidden border-b border-hairline lg:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="tag-no">
            ARCHIVO <span className="slash">/</span> EDICIÓN {new Date().getFullYear()}
          </p>
          <p className="tag-no">
            <span className="text-accent">●</span> ENVÍOS COORDINADOS <span className="slash">/</span> +1 737 268 9835
          </p>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <MobileMenu />
          <Link href="/" className="group flex items-baseline gap-2 leading-none">
            <span className="brand-display text-3xl text-foreground transition-colors group-hover:text-accent sm:text-4xl">
              Y&amp;M
            </span>
            <span className="hidden h-5 w-0.5 bg-accent sm:block" aria-hidden />
            <span className="hidden font-display text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:inline">
              Fashion LLC
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative flex items-baseline gap-2 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="slash text-xs">{link.no}</span>
              <span>{link.label}</span>
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-accent transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <CartButton />
          <ThemeToggle />
          {isStaffRole ? (
            <Link
              href="/admin"
              className="brand hidden h-10 items-center border-2 border-primary bg-primary px-4 text-xs text-primary-foreground transition-colors hover:bg-foreground/90 md:inline-flex"
            >
              Dashboard
            </Link>
          ) : isCustomer ? (
            <SignOutButton />
          ) : (
            <Link
              href="/login"
              className="brand hidden h-10 items-center border-2 border-foreground/25 px-4 text-xs text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground md:inline-flex"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
