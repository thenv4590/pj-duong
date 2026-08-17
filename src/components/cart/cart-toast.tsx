"use client";

import * as React from "react";
import Image from "next/image";
import { CheckCircle2, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { formatVnd } from "@/lib/format";

const AUTO_DISMISS_MS = 3500;

export function CartToast() {
  const { lastAdded, dismissLastAdded } = useCart();

  React.useEffect(() => {
    if (!lastAdded) return;
    const timer = window.setTimeout(dismissLastAdded, AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [lastAdded, dismissLastAdded]);

  if (!lastAdded) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-1/2 top-20 z-[60] w-[min(340px,calc(100vw-2rem))] -translate-x-1/2 animate-in fade-in-0 zoom-in-95 rounded-lg border border-border bg-background p-3 shadow-xl sm:left-auto sm:right-5 sm:translate-x-0"
    >
      <div className="flex items-start gap-2">
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
        <p className="flex-1 text-sm font-semibold text-emerald-600">
          Đã thêm vào giỏ hàng thành công!
        </p>
        <button
          type="button"
          aria-label="Đóng thông báo"
          onClick={dismissLastAdded}
          className="text-muted-foreground hover:text-ink"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
          <Image
            src={lastAdded.image}
            alt={lastAdded.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="line-clamp-2 text-sm text-ink">{lastAdded.name}</p>
          <p className="text-sm font-bold text-brand">{formatVnd(lastAdded.price)}</p>
        </div>
      </div>
    </div>
  );
}
