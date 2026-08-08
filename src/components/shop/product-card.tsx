import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { productDiscountPercent, productEffectivePrice } from "@/server/domain/product";
import { formatCurrency } from "@/lib/utils";
import type { ProductEntity } from "@/server/domain/product";

const FALLBACK_IMAGE = "/placeholder-product.svg";

export function ProductCard({ product }: { product: ProductEntity }) {
  const discount = productDiscountPercent(product);
  const isOnSale = product.isOnSale && product.salePrice !== null;
  const unitPrice = productEffectivePrice(product);

  return (
    <article className="group relative flex flex-col overflow-hidden border border-hairline bg-card transition-colors hover:border-foreground/25">
      <div className="flex items-baseline justify-between border-b border-hairline px-3 py-2">
        <span className="price text-[0.625rem] text-accent">
          FICHA {product.id.slice(0, 4).toUpperCase()}
        </span>
        <span className="price text-[0.625rem] text-muted-foreground">{product.category}</span>
      </div>

      <Link
        href={`/producto/${product.id}`}
        className="relative aspect-[4/5] overflow-hidden bg-secondary"
      >
        <Image
          src={product.imageUrl ?? FALLBACK_IMAGE}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {isOnSale && <Badge variant="sale">-{discount}%</Badge>}
          {product.saleLabel && isOnSale && <Badge variant="secondary">{product.saleLabel}</Badge>}
        </div>
      </Link>

      <AddToCartButton
        item={{
          kind: "product",
          id: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          unitPrice,
          currency: product.currency,
          maxQuantity: product.stock,
        }}
        className="absolute right-3 top-9"
      />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/producto/${product.id}`}>
          <h3 className="font-display text-lg font-medium leading-snug tracking-tight transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-auto flex items-baseline justify-between gap-2 border-t border-hairline pt-3">
          {isOnSale && product.salePrice !== null ? (
            <div className="flex items-baseline gap-2">
              <span className="price text-lg font-semibold text-accent">
                {formatCurrency(product.salePrice, product.currency)}
              </span>
              <span className="price text-sm text-muted-foreground line-through">
                {formatCurrency(product.price, product.currency)}
              </span>
            </div>
          ) : (
            <span className="price text-lg font-semibold">
              {formatCurrency(product.price, product.currency)}
            </span>
          )}
          <span className="price text-[0.625rem] text-muted-foreground">
            {product.stock > 0 ? `STK ${product.stock}` : "AGOTADO"}
          </span>
        </div>
      </div>
    </article>
  );
}
