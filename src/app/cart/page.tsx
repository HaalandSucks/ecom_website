"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useCartContext } from "@/components/CartProvider";

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function CartPage() {
  const cart = useCartContext();

  const shipping = useMemo(() => (cart.subtotal >= 1999 ? 0 : 99), [cart.subtotal]);
  const total = cart.subtotal + shipping;

  return (
    <main className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Your cart</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Review items and proceed to checkout.
            </p>
          </div>
          {cart.items.length ? (
            <button
              type="button"
              onClick={cart.clear}
              className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Clear
            </button>
          ) : null}
        </div>

        <div className="mt-6 space-y-4">
          {cart.items.length === 0 ? (
            <div className="rounded-2xl border border-black/10 bg-zinc-50 p-6 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
              Your cart is empty.{" "}
              <Link href="/" className="font-semibold underline">
                Continue shopping
              </Link>
              .
            </div>
          ) : (
            cart.items.map((item) => (
              <div
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center"
              >
                <Link
                  href={`/product/${item.slug}`}
                  className="relative h-28 w-24 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-white/5"
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/product/${item.slug}`}
                    className="block text-sm font-semibold text-zinc-900 hover:underline dark:text-white"
                  >
                    {item.name}
                  </Link>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <span className="rounded-full border border-black/10 bg-zinc-50 px-2 py-0.5 text-xs font-semibold text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                      {item.size}
                    </span>
                    <span className="rounded-full border border-black/10 bg-zinc-50 px-2 py-0.5 text-xs font-semibold text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                      {item.color}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    {formatINR(item.price)}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <label className="text-sm text-zinc-600 dark:text-zinc-300">
                      Qty
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) =>
                        cart.setQty(item.productId, Number(e.target.value))
                      }
                      className="w-20 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/20"
                    />

                    <button
                      type="button"
                      onClick={() => cart.remove(item.productId)}
                      className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right text-sm font-semibold text-zinc-900 dark:text-white">
                  {formatINR(item.price * item.qty)}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <aside className="h-fit rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Order summary</h2>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-200">
            <span>Subtotal</span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              {formatINR(cart.subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-200">
            <span>Shipping</span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              {shipping === 0 ? "Free" : formatINR(shipping)}
            </span>
          </div>
          <div className="my-3 h-px bg-black/10 dark:bg-white/10" />
          <div className="flex items-center justify-between">
            <span className="text-zinc-700 dark:text-zinc-200">Total</span>
            <span className="text-lg font-semibold">{formatINR(total)}</span>
          </div>
        </div>

        <Link
          href={cart.items.length ? "/checkout" : "/"}
          aria-disabled={cart.items.length === 0}
          className={
            "mt-6 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm " +
            (cart.items.length
              ? "bg-black text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
              : "cursor-not-allowed bg-zinc-200 text-zinc-500 dark:bg-white/10 dark:text-zinc-400")
          }
        >
          {cart.items.length ? "Proceed to checkout" : "Shop products"}
        </Link>

        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          Demo checkout — no real payments.
        </p>
      </aside>
    </main>
  );
}

