"use client";

import * as React from "react";
import type { Product } from "@/lib/site-config";

export type CartItem = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  variant?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, variant: string | undefined, quantity: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  lastAdded: CartItem | null;
  dismissLastAdded: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setOpen: (open: boolean) => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kuka-cart-v1";

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.key === "string" &&
    typeof item.productId === "string" &&
    typeof item.slug === "string" &&
    typeof item.name === "string" &&
    typeof item.image === "string" &&
    typeof item.price === "number" &&
    typeof item.quantity === "number"
  );
}

function persist(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage unavailable (e.g. private mode quota) - fail silently
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [lastAdded, setLastAdded] = React.useState<CartItem | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  // Hydrate from localStorage once on mount. This intentionally does NOT
  // write back to storage - a separate items-watching effect would race
  // with this initial state update (it fires in the same commit, before
  // setItems below is applied) and clobber the just-loaded cart with [].
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.every(isCartItem)) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  React.useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) return;
      try {
        const parsed = event.newValue ? JSON.parse(event.newValue) : [];
        if (Array.isArray(parsed) && parsed.every(isCartItem)) {
          setItems(parsed);
        }
      } catch {
        // ignore corrupt storage
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addItem = React.useCallback(
    (product: Product, variant: string | undefined, quantity: number) => {
      const key = `${product.id}::${variant ?? "default"}`;
      setItems((prev) => {
        const existing = prev.find((item) => item.key === key);
        const next = existing
          ? prev.map((item) =>
              item.key === key ? { ...item, quantity: item.quantity + quantity } : item
            )
          : [
              ...prev,
              {
                key,
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image: product.image,
                price: product.price,
                variant,
                quantity,
              },
            ];
        persist(next);
        return next;
      });
      setLastAdded({
        key,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        price: product.price,
        variant,
        quantity,
      });
    },
    []
  );

  const removeItem = React.useCallback((key: string) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.key !== key);
      persist(next);
      return next;
    });
  }, []);

  const updateQuantity = React.useCallback((key: string, quantity: number) => {
    setItems((prev) => {
      const next =
        quantity <= 0
          ? prev.filter((item) => item.key !== key)
          : prev.map((item) => (item.key === key ? { ...item, quantity } : item));
      persist(next);
      return next;
    });
  }, []);

  const clearCart = React.useCallback(() => {
    setItems([]);
    persist([]);
  }, []);
  const dismissLastAdded = React.useCallback(() => setLastAdded(null), []);
  const openCart = React.useCallback(() => setIsOpen(true), []);
  const closeCart = React.useCallback(() => setIsOpen(false), []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const value = React.useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      lastAdded,
      dismissLastAdded,
      isOpen,
      openCart,
      closeCart,
      setOpen: setIsOpen,
    }),
    [
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      lastAdded,
      dismissLastAdded,
      isOpen,
      openCart,
      closeCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
