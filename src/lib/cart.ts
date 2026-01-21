"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: Product["image"];
  qty: number;
  size: string;
  color: string;
};

const STORAGE_KEY = "ecom_closet_cart_v2";

function safeParseCart(json: string | null): CartItem[] {
  if (!json) return [];
  try {
    const val = JSON.parse(json) as unknown;
    if (!Array.isArray(val)) return [];
    return val
      .map((x) => {
        if (
          !x ||
          typeof x !== "object" ||
          typeof (x as any).productId !== "string" ||
          typeof (x as any).slug !== "string" ||
          typeof (x as any).name !== "string" ||
          typeof (x as any).price !== "number" ||
          typeof (x as any).qty !== "number" ||
          typeof (x as any).size !== "string" ||
          typeof (x as any).color !== "string" ||
          !(x as any).image ||
          typeof (x as any).image.src !== "string" ||
          typeof (x as any).image.alt !== "string"
        ) {
          return null;
        }
        return {
          productId: (x as any).productId,
          slug: (x as any).slug,
          name: (x as any).name,
          price: (x as any).price,
          image: (x as any).image,
          qty: Math.max(1, Math.floor((x as any).qty)),
          size: (x as any).size,
          color: (x as any).color,
        } satisfies CartItem;
      })
      .filter(Boolean) as CartItem[];
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(safeParseCart(window.localStorage.getItem(STORAGE_KEY)));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const add = useCallback((product: Product, qty: number = 1, size: string, color: string) => {
    setItems((prev) => {
      const nextQty = Math.max(1, Math.floor(qty));
      // Check if same product with same size and color exists
      const idx = prev.findIndex(
        (i) => i.productId === product.id && i.size === size && i.color === color
      );
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + nextQty };
        return copy;
      }
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: nextQty,
          size,
          color,
        },
      ];
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setItems((prev) => {
      const q = Math.max(1, Math.floor(qty));
      return prev.map((i) => (i.productId === productId ? { ...i, qty: q } : i));
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items],
  );

  return { items, hydrated, add, remove, setQty, clear, count, subtotal };
}

