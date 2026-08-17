"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/components/cart/cart-provider";
import { formatVnd } from "@/lib/format";

export function CartSheet() {
  const { items, itemCount, subtotal, removeItem, updateQuantity, isOpen, setOpen } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger aria-label="Giỏ hàng" className="relative text-ink hover:text-brand">
        <ShoppingBag className="size-5" />
        {itemCount > 0 && (
          <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-semibold text-white">
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="flex w-[90vw] max-w-md flex-col gap-0 p-0">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="text-left">Giỏ hàng ({itemCount})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center text-sm text-muted-foreground">
            <ShoppingBag className="size-10 text-muted-foreground/50" />
            Giỏ hàng của bạn đang trống.
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y overflow-y-auto px-4">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3 py-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      href={`/products/${item.slug}`}
                      className="line-clamp-2 text-sm font-medium text-ink hover:text-brand"
                    >
                      {item.name}
                    </Link>
                    {item.variant && (
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {item.variant}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                      <div className="inline-flex items-center rounded-md border border-input">
                        <button
                          type="button"
                          aria-label="Giảm số lượng"
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="flex size-7 items-center justify-center text-ink hover:bg-accent"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Tăng số lượng"
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="flex size-7 items-center justify-center text-ink hover:bg-accent"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-brand">
                        {formatVnd(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Xoá ${item.name} khỏi giỏ hàng`}
                    onClick={() => removeItem(item.key)}
                    className="self-start text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t px-4 py-4">
              <div className="flex items-center justify-between text-sm font-semibold text-ink">
                <span>Tạm tính</span>
                <span className="text-lg text-brand">{formatVnd(subtotal)}</span>
              </div>
              <Link
                href="/cart"
                className="mt-3 flex h-11 w-full items-center justify-center rounded-md bg-brand text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
              >
                Xem giỏ hàng &amp; thanh toán
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
