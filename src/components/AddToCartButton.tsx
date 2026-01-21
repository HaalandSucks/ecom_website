"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCartContext } from "@/components/CartProvider";

type AddToCartButtonProps = {
  product: Product;
  className?: string;
  size?: string;
  color?: string;
};

export function AddToCartButton({
  product,
  className,
  size = "default",
  color = "default",
}: AddToCartButtonProps) {
  const cart = useCartContext();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        cart.add(product, 1, size, color);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 900);
      }}
      className={className}
    >
      {added ? "Added ✓" : "Add to cart"}
    </button>
  );
}


//force redeploy