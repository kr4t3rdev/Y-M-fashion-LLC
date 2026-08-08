import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import {
  comboAvailable,
  comboDiscountPercent,
  comboEffectivePrice,
  comboMaxQuantity,
  comboTotalUnits,
  type ComboEntity,
} from "@/server/domain/combo";
import { formatCurrency } from "@/lib/utils";

const FALLBACK_IMAGE = "/placeholder-product.svg";

export function ComboCard({ combo }: { combo: ComboEntity }) {
  const discount = comboDiscountPercent(combo);
  const isOnSale = combo.isOnSale && combo.salePrice !== null;
  const available = comboAvailable(combo);
  const unitPrice = comboEffectivePrice(combo);

  return (
    <article className="group relative flex flex-col overflow-hidden border border-hairline bg-card transition-colors hover:border-foreground/25">
      <div className="flex items-baseline justify-between border-b border-hairline px-3 py-2">
        <span className="price text-[0.625rem] text-accent">
          COMBO {combo.id.slice(0, 4).toUpperCase()}
        </span>
        <span className="price text-[0.625rem] text-muted-foreground">
          {comboTotalUnits(combo.items)} piezas
        </span>
      </div>

      <Link
        href={`/combos/${combo.id}`}
        className="relative aspect-[4/5] overflow-hidden bg-secondary"
      >
        <Image
          src={combo.imageUrl ?? FALLBACK_IMAGE}
          alt={combo.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {isOnSale && discount !== null && <Badge variant="sale">-{discount}%</Badge>}
          {combo.saleLabel && isOnSale && <Badge variant="secondary">{combo.saleLabel}</Badge>}
          {!available && <Badge variant="destructive">Agotado</Badge>}
        </div>
      </Link>

      <AddToCartButton
        item={{
          kind: "combo",
          id: combo.id,
          name: combo.name,
          imageUrl: combo.imageUrl,
          unitPrice,
          currency: combo.currency,
          maxQuantity: comboMaxQuantity(combo),
        }}
        className="absolute right-3 top-9"
      />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/combos/${combo.id}`}>
          <h3 className="font-display text-lg font-medium leading-snug tracking-tight transition-colors group-hover:text-accent">
            {combo.name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {combo.description}
        </p>
        <div className="mt-auto flex items-baseline justify-between gap-2 border-t border-hairline pt-3">
          {isOnSale && combo.salePrice !== null ? (
            <div className="flex items-baseline gap-2">
              <span className="price text-lg font-semibold text-accent">
                {formatCurrency(combo.salePrice, combo.currency)}
              </span>
              <span className="price text-sm text-muted-foreground line-through">
                {formatCurrency(combo.price, combo.currency)}
              </span>
            </div>
          ) : (
            <span className="price text-lg font-semibold">
              {formatCurrency(combo.price, combo.currency)}
            </span>
          )}
          <span className="price text-[0.625rem] text-muted-foreground">
            {available ? `${combo.items.length} ITEMS` : "AGOTADO"}
          </span>
        </div>
      </div>
    </article>
  );
}
