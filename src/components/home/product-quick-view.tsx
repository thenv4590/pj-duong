"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye, Minus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatVnd } from "@/lib/format";
import type { Product } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-provider";

export function ProductQuickView({ product }: { product: Product }) {
  const [open, setOpen] = React.useState(false);
  const [activeImage, setActiveImage] = React.useState(0);
  const [variant, setVariant] = React.useState(product.variants[0]);
  const [quantity, setQuantity] = React.useState(1);
  const { addItem } = useCart();

  React.useEffect(() => {
    if (!open) return;
    setActiveImage(0);
    setVariant(product.variants[0]);
    setQuantity(1);
  }, [open, product]);

  const showPrev = () =>
    setActiveImage((i) => (i - 1 + product.images.length) % product.images.length);
  const showNext = () => setActiveImage((i) => (i + 1) % product.images.length);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          setOpen(true);
        }}
        aria-label={`Xem nhanh ${product.name}`}
        className="flex size-8 items-center justify-center rounded-full bg-white/90 text-ink shadow transition-transform hover:scale-105"
      >
        <Eye className="size-4" />
      </button>

      <DialogContent
        showCloseButton
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto p-4 sm:max-w-3xl sm:p-6"
      >
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Xem nhanh thông tin và tuỳ chọn mua {product.name}
        </DialogDescription>

        <div className="grid grid-cols-1 gap-6 pt-2 sm:grid-cols-2">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                sizes="(min-width: 640px) 40vw, 90vw"
                className="object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Ảnh trước"
                    onClick={showPrev}
                    className="absolute left-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Ảnh sau"
                    onClick={showNext}
                    className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Xem ảnh ${index + 1}`}
                    aria-current={activeImage === index}
                    className={cn(
                      "relative size-16 overflow-hidden rounded-md border-2",
                      activeImage === index ? "border-brand" : "border-transparent"
                    )}
                  >
                    <Image src={image} alt="" fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h2 className="text-lg font-bold leading-snug text-ink">{product.name}</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Mã sản phẩm: <span className="font-semibold text-ink">{product.sku}</span>
              <span className="mx-2">|</span>
              Tình trạng:{" "}
              <span
                className={cn(
                  "font-semibold",
                  product.inStock ? "text-emerald-600" : "text-destructive"
                )}
              >
                {product.inStock ? "Còn hàng" : "Hết hàng"}
              </span>
              <br className="sm:hidden" />
              <span className="mx-2 hidden sm:inline">|</span>
              <br />
              Thương hiệu: <span className="font-semibold text-ink">{product.brand}</span>
            </p>

            <div className="mt-4">
              <span className="text-xs font-medium text-muted-foreground">Giá:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-brand">
                  {formatVnd(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatVnd(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>

            {product.variants.length > 0 && (
              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Quy cách:
                </label>
                <Select
                  value={variant}
                  onValueChange={(value) => value && setVariant(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {product.variants.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="mt-4">
              <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Số lượng:
              </span>
              <div className="inline-flex items-center rounded-md border border-input">
                <button
                  type="button"
                  aria-label="Giảm số lượng"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex size-9 items-center justify-center text-ink hover:bg-accent"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-medium tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Tăng số lượng"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex size-9 items-center justify-center text-ink hover:bg-accent"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>

            <button
              type="button"
              disabled={!product.inStock}
              onClick={() => {
                addItem(product, variant, quantity);
                setOpen(false);
              }}
              className="mt-5 h-11 w-full rounded-md bg-brand text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
            >
              {product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
            </button>

            <Link
              href={`/products/${product.slug}`}
              className="mt-3 text-sm text-ink underline underline-offset-2 hover:text-brand"
            >
              Xem chi tiết sản phẩm »
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
