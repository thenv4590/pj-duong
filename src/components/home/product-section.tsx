import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/home/product-card";
import type { Product } from "@/lib/site-config";

export function ProductSection({
  id,
  title,
  subtitle,
  viewAllHref,
  products,
  columns = 4,
}: {
  id: string;
  title: string;
  subtitle?: string;
  viewAllHref: string;
  products: Product[];
  columns?: 3 | 4;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mx-auto max-w-[1280px] px-4 py-10 lg:py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2
            id={`${id}-heading`}
            className="text-xl font-bold uppercase tracking-wide text-ink sm:text-2xl"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <Link
          href={viewAllHref}
          className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand hover:underline sm:flex"
        >
          Xem tất cả
          <ChevronRight className="size-4" />
        </Link>
      </div>

      <div
        className={`grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-6 ${
          columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
        }`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-6 flex justify-center sm:hidden">
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 rounded-full border border-brand px-5 py-2 text-sm font-semibold text-brand"
        >
          Xem tất cả
          <ChevronRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
