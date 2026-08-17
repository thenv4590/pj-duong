import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { discountPercent, formatVnd } from "@/lib/format";
import type { Product } from "@/lib/site-config";
import { ProductQuickView } from "@/components/home/product-quick-view";

export function ProductCard({ product }: { product: Product }) {
  const discount = discountPercent(product.price, product.compareAtPrice);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link
          href={`/products/${product.slug}`}
          aria-label={product.name}
          className="absolute inset-0 z-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {discount && (
          <Badge className="pointer-events-none absolute left-2 top-2 z-10 rounded-full bg-brand px-2.5 py-1 text-xs font-bold text-white hover:bg-brand">
            -{discount}%
          </Badge>
        )}

        <div className="absolute right-2 top-2 z-10 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            aria-label="Thêm vào yêu thích"
            className="flex size-8 items-center justify-center rounded-full bg-white/90 text-ink shadow transition-transform hover:scale-105"
          >
            <Heart className="size-4" />
          </button>
          <ProductQuickView product={product} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {product.category}
        </p>
        <h3 className="line-clamp-2 min-h-10 text-sm font-medium text-ink">
          <Link href={`/products/${product.slug}`} className="hover:text-brand">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-base font-bold text-brand">
            {formatVnd(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatVnd(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
