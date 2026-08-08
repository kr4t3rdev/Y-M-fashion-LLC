import { Tag } from "lucide-react";
import { ProductGrid } from "@/components/shop/product-grid";
import { productService } from "@/server/application/product-service";
import { productIsOnSale } from "@/server/domain/product";

export const metadata = {
  title: "Ofertas",
};

export default async function OfertasPage() {
  const products = await productService.listProducts();
  const onSale = products.filter((p) => productIsOnSale(p));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="flex items-baseline gap-3">
          <span className="price text-[0.6875rem] font-medium text-accent">OFF</span>
          <span className="inline-flex items-center gap-1.5 border border-accent/30 px-2 py-0.5">
            <Tag className="size-3 text-accent" />
            <span className="text-[0.625rem] uppercase tracking-widest text-accent">Ofertas activas</span>
          </span>
        </div>
        <h1 className="brand-display mt-3 text-5xl text-foreground sm:text-6xl">Ofertas</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Piezas seleccionadas con descuentos exclusivos, disponibles por tiempo limitado.
        </p>
      </div>
      <ProductGrid products={onSale} />
    </div>
  );
}
