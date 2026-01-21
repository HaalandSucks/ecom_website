"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCartContext } from "@/components/CartProvider";

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function CheckoutPage() {
  const cart = useCartContext();
  const router = useRouter();
  const [placing, setPlacing] = useState(false);

  const shipping = useMemo(() => (cart.subtotal >= 1999 ? 0 : 99), [cart.subtotal]);
  const total = cart.subtotal + shipping;

  // Wait for cart to hydrate before showing empty state
  if (!cart.hydrated) {
    return (
      <main className="rounded-3xl border border-black/10 bg-white p-10 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
        <h1 className="text-2xl font-semibold tracking-tight">Loading...</h1>
      </main>
    );
  }

  if (cart.items.length === 0) {
    return (
      <main className="rounded-3xl border border-black/10 bg-white p-10 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
          Your cart is empty.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
        >
          Shop products
        </Link>
      </main>
    );
  }

  return (
    <main className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          Demo checkout form — no payments.
        </p>

        <form
          className="mt-6 grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setPlacing(true);

            const formData = new FormData(e.currentTarget);
            const orderData = {
              firstName: formData.get("firstName") as string,
              lastName: formData.get("lastName") as string,
              email: formData.get("email") as string,
              address: formData.get("address") as string,
              city: formData.get("city") as string,
              pinCode: formData.get("pin") as string,
              subtotal: cart.subtotal,
              shipping,
              total,
              items: cart.items.map((item) => ({
                productId: item.productId,
                productName: item.name,
                size: item.size,
                color: item.color,
                price: item.price,
                quantity: item.qty,
              })),
            };

            try {
              const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
              });

              if (!response.ok) {
                throw new Error("Failed to create order");
              }

              const result = await response.json();
              cart.clear();
              router.push(`/order-confirmation?orderId=${result.orderId}`);
            } catch (error) {
              console.error("Order submission error:", error);
              alert("Failed to place order. Please try again.");
              setPlacing(false);
            }
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold" htmlFor="firstName">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                required
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/20"
                placeholder="Aditya"
              />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="lastName">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                required
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/20"
                placeholder="Sharma"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-semibold" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              name="address"
              required
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/20"
              placeholder="Street, area"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold" htmlFor="city">
                City
              </label>
              <input
                id="city"
                name="city"
                required
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/20"
                placeholder="Pune"
              />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="pin">
                PIN code
              </label>
              <input
                id="pin"
                name="pin"
                inputMode="numeric"
                required
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/20"
                placeholder="411001"
              />
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={placing}
              className={
                "inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm " +
                (placing
                  ? "cursor-not-allowed bg-zinc-200 text-zinc-500 dark:bg-white/10 dark:text-zinc-400"
                  : "bg-black text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100")
              }
            >
              {placing ? "Placing order..." : "Place order (demo)"}
            </button>
            <Link
              href="/cart"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Back to cart
            </Link>
          </div>
        </form>
      </section>

      <aside className="h-fit rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Summary</h2>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-200">
            <span>Items</span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              {cart.count}
            </span>
          </div>
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

        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          This is a demo store — order placement just clears the cart and shows a
          confirmation screen.
        </p>
      </aside>
    </main>
  );
}

