import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Droplets, Shirt, ShieldCheck, Smartphone, Sparkles, Tag } from "lucide-react";
import { ProductGrid } from "@/components/shop/product-grid";
import { ComboGrid } from "@/components/shop/combo-grid";
import { productService } from "@/server/application/product-service";
import { comboService } from "@/server/application/combo-service";
import { productIsOnSale } from "@/server/domain/product";

export const metadata = {
  title: "Moda, Belleza y Tecnología — Y&M Fashion LLC",
};

const CATEGORIES = [
  {
    no: "01",
    title: "Moda y calzado",
    description: "Ropa y zapatos para hombre y mujer, seleccionados con criterio.",
    icon: Shirt,
  },
  {
    no: "02",
    title: "Belleza Mary Kay",
    description: "Accesorios de maquillaje de la mano de Mary Kay.",
    icon: Sparkles,
  },
  {
    no: "03",
    title: "Teléfonos",
    description: "Samsung y Xiaomi Redmi, con garantía y buena condición.",
    icon: Smartphone,
  },
  {
    no: "04",
    title: "Accesorios para teléfonos",
    description: "Covers y micas para proteger tu equipo.",
    icon: ShieldCheck,
  },
  {
    no: "05",
    title: "Aseo personal",
    description: "Cremas para la piel y sprays corporales para tu día a día.",
    icon: Droplets,
  },
];

export default async function HomePage() {
  const [products, combos] = await Promise.all([productService.listProducts(), comboService.listCombos()]);
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const onSale = products.filter((p) => productIsOnSale(p)).slice(0, 4);
  const fallback = featured.length > 0 ? featured : products.slice(0, 4);
  const featuredCombos = combos.slice(0, 4);

  return (
    <div className="flex flex-col pb-24">
      {/* Hero — el archivo se abre */}
      <section className="relative overflow-hidden border-b-2 border-foreground/15">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_1fr] md:items-center md:py-24 lg:px-8">
          <div>
            <div className="mb-6 flex items-baseline gap-3">
              <span className="price text-[0.6875rem] font-medium text-accent">CAT-2026</span>
              <span className="h-px flex-1 bg-hairline" aria-hidden />
              <span className="tag-no">Piezas fichadas con intención</span>
            </div>
            <h1 className="font-display text-[2.75rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.25rem]">
              El archivo de
              <br />
              tu estilo,
              <br />
              <em className="text-accent">curado para ti</em>.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Moda y calzado, belleza Mary Kay, teléfonos Samsung y Xiaomi Redmi, accesorios y aseo
              personal. Cada pieza es una ficha del archivo, elegida porque la mereces.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/catalogo"
                className="group inline-flex h-11 items-center gap-2 border-2 border-primary bg-primary px-6 text-sm font-semibold uppercase tracking-[0.06em] text-primary-foreground transition-colors hover:bg-foreground/90"
              >
                Abrir el catálogo
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/ofertas"
                className="brand inline-flex h-11 items-center border-2 border-foreground/25 px-6 text-xs tracking-[0.14em] text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                Ver ofertas
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-3 right-2 z-10 rotate-2 border-2 border-foreground/20 bg-background px-3 py-1.5">
              <span className="price text-[0.625rem] text-muted-foreground">Nº {String(1).padStart(3, "0")}</span>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden border-2 border-foreground/15">
              <Image
                src="/hero-fashion.jpg"
                alt="Modelo vistiendo moda editorial de Y&M Fashion"
                fill
                priority
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 flex items-baseline gap-2 p-5 text-primary-foreground">
                <span className="brand-display text-3xl italic sm:text-4xl">YM</span>
                <span className="text-xs uppercase tracking-[0.3em] opacity-90">Y&M Fashion LLC</span>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="tag-no">Edición {new Date().getFullYear()} · Portada del archivo</p>
              <span className="price text-[0.625rem] text-accent">REF. YM-001</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías — índice del archivo */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-baseline gap-3">
          <span className="price text-[0.6875rem] font-medium text-accent">ÍNDICE</span>
          <span className="h-px flex-1 bg-hairline" aria-hidden />
          <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
            Lo que encuentras aquí
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden border-2 border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((category) => (
            <Link
              key={category.no}
              href="/catalogo"
              className="group flex flex-col justify-between gap-10 bg-background p-5 transition-colors hover:bg-secondary"
            >
              <div className="flex items-baseline justify-between">
                <span className="slash text-xs">{category.no}</span>
                <category.icon className="size-5 text-muted-foreground transition-colors group-hover:text-accent" />
              </div>
              <div>
                <h3 className="brand text-sm tracking-[0.1em]">{category.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground transition-colors group-hover:text-accent">
                  Abrir ficha <ArrowRight className="size-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Piezas destacadas */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="section-no">01</span>
              <div>
                <span className="price text-[0.6875rem] font-medium text-accent">DESTACADOS</span>
                <span className="mx-2 inline-block h-px w-8 translate-y-[-3px] bg-hairline" aria-hidden />
              </div>
              <span className="hidden h-px flex-1 bg-hairline sm:block" aria-hidden />
            </div>
            <h2 className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">
              Piezas destacadas
            </h2>
            <p className="mt-2 text-muted-foreground">Una selección curada de nuestro archivo.</p>
          </div>
          <Link
            href="/catalogo"
            className="hidden items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:text-accent sm:inline-flex"
          >
            Ver todo <ArrowRight className="size-4" />
          </Link>
        </div>
        <ProductGrid products={fallback} />
      </section>

      {/* Combos */}
      {featuredCombos.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="section-no">02</span>
                <div>
                  <span className="price text-[0.6875rem] font-medium text-accent">COMBOS</span>
                  <span className="mx-2 inline-block h-px w-8 translate-y-[-3px] bg-hairline" aria-hidden />
                </div>
                <span className="hidden h-px flex-1 bg-hairline sm:block" aria-hidden />
              </div>
              <h2 className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                Combos que combinan
              </h2>
              <p className="mt-2 text-muted-foreground">Varias piezas en un solo precio.</p>
            </div>
            <Link
              href="/combos"
              className="hidden items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:text-accent sm:inline-flex"
            >
              Ver todos <ArrowRight className="size-4" />
            </Link>
          </div>
          <ComboGrid combos={featuredCombos} />
        </section>
      )}

      {/* Banner editorial */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border-2 border-foreground/15 bg-primary px-6 py-16 text-primary-foreground sm:px-12">
          <div className="absolute right-6 top-6 rotate-2 border border-primary-foreground/25 px-2 py-1">
            <span className="price text-[0.625rem] text-primary-foreground/70">REF. YM-000</span>
          </div>
          <p className="tag-no !text-primary-foreground/70">Y&M Fashion LLC</p>
          <h2 className="mt-4 max-w-xl font-display text-3xl font-medium leading-tight sm:text-4xl">
            Estilo, cuidado y tecnología, sin salir de aquí.
          </h2>
          <p className="mt-4 max-w-lg text-primary-foreground/85">
            Una tienda que entiende lo que necesitas: viste con intención, cuida tu piel y lleva tu
            teléfono al día.
          </p>
        </div>
      </section>

      {/* Ofertas */}
      {onSale.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="section-no">03</span>
                <div>
                  <span className="price text-[0.6875rem] font-medium text-accent">OFF</span>
                  <span className="mx-2 inline-block h-px w-8 translate-y-[-3px] bg-hairline" aria-hidden />
                  <span className="inline-flex items-center gap-1.5 border-2 border-accent/40 px-2 py-0.5">
                    <Tag className="size-3 text-accent" />
                    <span className="text-[0.625rem] uppercase tracking-widest">Por tiempo limitado</span>
                  </span>
                </div>
                <span className="hidden h-px flex-1 bg-hairline sm:block" aria-hidden />
              </div>
              <h2 className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                Ofertas destacadas
              </h2>
            </div>
            <Link
              href="/ofertas"
              className="hidden items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.06em] text-accent transition-colors hover:text-accent/80 sm:inline-flex"
            >
              Ver todas las ofertas <ArrowRight className="size-4" />
            </Link>
          </div>
          <ProductGrid products={onSale} />
        </section>
      )}
    </div>
  );
}
