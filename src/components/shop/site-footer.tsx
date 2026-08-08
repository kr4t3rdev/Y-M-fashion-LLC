import Link from "next/link";
import { CreditCard, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { NewsletterForm } from "./newsletter-form";
import { InstagramIcon, TikTokIcon } from "./social-icons";

const WHATSAPP_URL = "https://wa.me/17372689835";

const SHOP_LINKS = [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Combos", href: "/combos" },
  { label: "Ofertas", href: "/ofertas" },
];

const HELP_LINKS = [
  { label: "Cómo comprar", href: "/ayuda#como-comprar" },
  { label: "Finalizar pedido", href: "/ayuda#finalizar-pedido" },
  { label: "Envíos y entregas", href: "/ayuda#envios-y-entregas" },
];

const ACCOUNT_LINKS = [
  { label: "Iniciar sesión", href: "/login" },
  { label: "Crear cuenta", href: "/register" },
];

function FooterColumn({
  title,
  no,
  links,
  className,
}: {
  title: string;
  no: string;
  links: { label: string; href: string; external?: boolean }[];
  className?: string;
}) {
  return (
    <nav aria-label={title} className={className}>
      <div className="flex items-baseline gap-2">
        <span className="price text-[0.625rem] font-medium text-accent">{no}</span>
        <h3 className="brand text-xs tracking-[0.18em]">{title}</h3>
      </div>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-baseline gap-3 border-b border-hairline pb-8">
          <span className="price text-[0.625rem] font-medium text-accent">FILENAME</span>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            El archivo continúa.
          </h2>
        </div>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col items-start sm:col-span-2 lg:col-span-4">
            <Link href="/" className="flex items-baseline gap-2">
              <span className="brand text-2xl">Y&M</span>
              <span className="font-display text-base uppercase tracking-[0.2em] text-muted-foreground">
                Fashion LLC
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Cada pieza del archivo es seleccionada por su intención, no por inventario. Moda,
              belleza, telefonía y aseo con el mismo criterio editorial.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href="#"
                aria-label="Instagram de Y&M Fashion"
                className="inline-flex size-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href="#"
                aria-label="TikTok de Y&M Fashion"
                className="inline-flex size-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <TikTokIcon className="size-4" />
              </a>
            </div>
          </div>

          <FooterColumn title="Tienda" no="01" links={SHOP_LINKS} className="lg:col-span-2" />
          <FooterColumn title="Ayuda" no="02" links={HELP_LINKS} className="lg:col-span-2" />
          <FooterColumn title="Cuenta" no="03" links={ACCOUNT_LINKS} className="lg:col-span-2" />

          <nav aria-label="Contacto" className="lg:col-span-2">
            <div className="flex items-baseline gap-2">
              <span className="price text-[0.625rem] font-medium text-accent">04</span>
              <h3 className="brand text-xs tracking-[0.18em]">Contacto</h3>
            </div>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  <MessageCircle className="size-4 text-accent" />
                  +1 737 268 9835
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Coordinamos la entrega y el pago directamente contigo.
            </p>
          </nav>
        </div>

        {/* Logística */}
        <div className="mt-14 grid gap-4 border-t border-hairline pt-10 sm:grid-cols-3">
          {[
            {
              icon: Truck,
              title: "Envío coordinado",
              body: "Acordamos la entrega directamente contigo.",
            },
            {
              icon: CreditCard,
              title: "Pago directo",
              body: "Confirmamos el método de pago al coordinar tu pedido.",
            },
            {
              icon: ShieldCheck,
              title: "Stock reservado",
              body: "Guardamos tus piezas por 24 horas al confirmar.",
            },
          ].map(({ icon: Icon, title, body }, i) => (
            <div key={title} className="flex items-start gap-3 border-l border-hairline pl-4">
              <span className="price text-[0.625rem] font-medium text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Icon className="mt-0.5 size-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-10 border-t border-hairline pt-10">
          <NewsletterForm />
        </div>

        {/* Barra final */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-hairline pt-8 sm:flex-row">
          <p className="tag-no">
            © {new Date().getFullYear()} Y&M Fashion LLC. Todos los derechos reservados.
          </p>
          <p className="tag-no">
            Curation, archive & code <span className="text-accent">·</span> kr4t3rdev
          </p>
        </div>
      </div>
    </footer>
  );
}
