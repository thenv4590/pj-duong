"use client";

import * as React from "react";
import { BadgeCheck, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatVnd } from "@/lib/format";
import type { Product } from "@/lib/site-config";
import { useCart } from "@/components/cart/cart-provider";

const trustBadges = [
  { icon: BadgeCheck, label: "Cam kết 100% chính hãng" },
  { icon: Truck, label: "Miễn phí lắp đặt tại nhà" },
  { icon: ShieldCheck, label: "Cam kết bảo hành 3 năm" },
];

export function ProductBuyBox({ product }: { product: Product }) {
  const [variant, setVariant] = React.useState(product.variants[0]);
  const [quantity, setQuantity] = React.useState(1);
  const { addItem, openCart } = useCart();

  const variantIndex = product.variants.indexOf(variant);
  const price = product.variantPrices?.[variantIndex] ?? product.price;

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold leading-snug text-ink sm:text-2xl">{product.name}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Mã sản phẩm: <span className="font-semibold text-ink">{product.sku}</span>
        <span className="mx-2">|</span>
        Tình trạng:{" "}
        <span className={product.inStock ? "font-semibold text-emerald-600" : "font-semibold text-destructive"}>
          {product.inStock ? "Còn hàng" : "Hết hàng"}
        </span>
        <br className="sm:hidden" />
        <span className="mx-2 hidden sm:inline">|</span>
        <br className="hidden sm:block" />
        Thương hiệu: <span className="font-semibold text-ink">{product.brand}</span>
      </p>

      <div className="mt-4">
        <span className="text-xs font-medium text-muted-foreground">Giá:</span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-brand">{formatVnd(price)}</span>
          {product.compareAtPrice && (
            <span className="text-base text-muted-foreground line-through">
              {formatVnd(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>

      {product.variants.length > 0 && (
        <div className="mt-5">
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Quy cách:
          </label>
          <Select value={variant} onValueChange={(value) => value && setVariant(value)}>
            <SelectTrigger className="w-full sm:w-80">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {product.variants.map((option, index) => (
                <SelectItem key={option} value={option}>
                  {option}
                  {product.variantPrices?.[index] !== undefined &&
                    ` - ${formatVnd(product.variantPrices[index])}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="mt-5">
        <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Số lượng:</span>
        <div className="inline-flex items-center rounded-md border border-input">
          <button
            type="button"
            aria-label="Giảm số lượng"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex size-10 items-center justify-center text-ink hover:bg-accent"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-12 text-center text-sm font-medium tabular-nums">{quantity}</span>
          <button
            type="button"
            aria-label="Tăng số lượng"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex size-10 items-center justify-center text-ink hover:bg-accent"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => addItem({ ...product, price }, variant, quantity)}
          className="h-12 flex-1 rounded-md border-2 border-brand bg-white text-sm font-bold uppercase tracking-wide text-brand transition-colors hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:border-muted disabled:text-muted-foreground disabled:hover:bg-white"
        >
          {product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
        </button>
        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => {
            addItem({ ...product, price }, variant, quantity);
            openCart();
          }}
          className="h-12 flex-1 rounded-md bg-brand text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
        >
          Mua ngay
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 border-t border-border pt-5 sm:grid-cols-3">
        {trustBadges.map((badge) => (
          <div key={badge.label} className="flex items-center gap-2 text-xs text-muted-foreground">
            <badge.icon className="size-5 shrink-0 text-brand" />
            <span>{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
