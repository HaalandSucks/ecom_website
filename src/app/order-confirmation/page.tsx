"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <main className="rounded-3xl border border-black/10 bg-white p-10 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
        <svg
          className="h-8 w-8 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <p className="mt-4 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
        Order placed successfully
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        Thanks for your order!
      </h1>

      {orderId && (
        <div className="mt-4 rounded-2xl border border-black/10 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Order Number
          </p>
          <p className="mt-1 text-xl font-semibold text-zinc-900 dark:text-white">
            #{orderId}
          </p>
        </div>
      )}

      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
        Your order has been saved to our database. This is a demo store — no
        real payment or delivery will occur.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
        >
          Continue shopping
        </Link>
        <Link
          href="/cart"
          className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          View cart
        </Link>
      </div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="rounded-3xl border border-black/10 bg-white p-10 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">Loading...</p>
        </main>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
