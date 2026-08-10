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
      <div className="flex items-baseline gap-3">
        <span className="slash text-xs">{no}</span>
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
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
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
    <footer className="border-t-2 border-foreground/15 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Marca gigante */}
        <div className="mb-12 flex flex-col gap-6 border-b-2 border-hairline pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="tag-no">
              FILENAME <span className="slash">/</span> EL ARCHIVO CONTINÚA
            </p>
            <h2 className="brand-display mt-3 text-5xl text-foreground sm:text-7xl">Y&amp;M Fashion</h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground lg:text-right">
            Cada pieza del archivo es seleccionada por su intención, no por inventario. Moda,
            belleza, telefonía y aseo con el mismo criterio editorial.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col items-start sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-2">
              <a
                href="#"
                aria-label="Instagram de Y&M Fashion"
                className="inline-flex size-11 items-center justify-center border-2 border-foreground/25 text-muted-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href="#"
                aria-label="TikTok de Y&M Fashion"
                className="inline-flex size-11 items-center justify-center border-2 border-foreground/25 text-muted-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                <TikTokIcon className="size-4" />
              </a>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Síguenos para conocer las nuevas piezas del archivo antes que nadie.
            </p>
          </div>

          <FooterColumn title="Tienda" no="01" links={SHOP_LINKS} className="lg:col-span-2" />
          <FooterColumn title="Ayuda" no="02" links={HELP_LINKS} className="lg:col-span-2" />
          <FooterColumn title="Cuenta" no="03" links={ACCOUNT_LINKS} className="lg:col-span-2" />

          <nav aria-label="Contacto" className="lg:col-span-2">
            <div className="flex items-baseline gap-3">
              <span className="slash text-xs">04</span>
              <h3 className="brand text-xs tracking-[0.18em]">Contacto</h3>
            </div>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
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

        {/* Logística — cajas numeradas */}
        <div className="mt-14 grid gap-px border-2 border-hairline bg-hairline sm:grid-cols-3">
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
            <div key={title} className="flex items-start gap-3 bg-background p-5">
              <div className="flex flex-col items-center gap-3">
                <span className="slash text-xs">{String(i + 1).padStart(2, "0")}</span>
                <Icon className="size-5 shrink-0 text-accent" />
              </div>
              <div>
                <p className="brand text-xs tracking-[0.1em]">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Barra final */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t-2 border-hairline pt-8 sm:flex-row">
          <p className="tag-no">
            © {new Date().getFullYear()} Y&M Fashion LLC. Todos los derechos reservados.
          </p>
          <p className="tag-no">
            Curation, archive & code <span className="slash">/</span> kr4t3rdev
          </p>
        </div>
      </div>
    </footer>
  );
}
