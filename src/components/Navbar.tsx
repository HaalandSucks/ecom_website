 "use client";

import Link from "next/link";
import { useCartContext } from "@/components/CartProvider";

export function Navbar() {
  const cart = useCartContext();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-zinc-950/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black text-sm font-semibold text-white dark:bg-white dark:text-black">
            EC
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Ecom Closet
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-full px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/10"
          >
            Shop
          </Link>
          <a
            href="#women"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/10 sm:inline-flex"
          >
            Women
          </a>
          <a
            href="#men"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/10 sm:inline-flex"
          >
            Men
          </a>
          <Link
            href="/cart"
            className="ml-1 inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            aria-label="Cart"
            title="Cart"
          >
            Cart
            <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-xs font-semibold text-white dark:bg-white dark:text-black">
              {cart.hydrated ? cart.count : 0}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

