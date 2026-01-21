"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import { getProductBySlug } from "@/lib/products";
import { AddToCartButton } from "@/components/AddToCartButton";

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const hasDiscount =
    typeof product.compareAtPrice === "number" &&
    product.compareAtPrice > product.price;

  const canAddToCart = selectedSize !== "" && selectedColor !== "";

  return (
    <main>
      <div className="mb-6 text-sm text-zinc-600 dark:text-zinc-300">
        <Link href="/" className="font-semibold hover:underline">
          Shop
        </Link>{" "}
        <span className="text-zinc-400">/</span> {product.category}{" "}
        <span className="text-zinc-400">/</span>{" "}
        <span className="text-zinc-900 dark:text-white">{product.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="relative aspect-[4/5]">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="text-xl font-semibold">{formatINR(product.price)}</p>
              {hasDiscount ? (
                <p className="text-sm text-zinc-500 line-through dark:text-zinc-400">
                  {formatINR(product.compareAtPrice!)}
                </p>
              ) : null}
              <span className="text-sm text-zinc-600 dark:text-zinc-300">
                ★ {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
            {product.description}
          </p>

          <div className="grid gap-4 rounded-3xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
                Available sizes {selectedSize && `— ${selectedSize} selected`}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={
                      "rounded-full border px-3 py-1 text-sm font-semibold transition-all " +
                      (selectedSize === s
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-black/10 bg-white text-zinc-900 hover:border-black/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/30")
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
                Colors {selectedColor && `— ${selectedColor} selected`}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={
                      "rounded-full border px-3 py-1 text-sm font-semibold transition-all " +
                      (selectedColor === c
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-black/10 bg-white text-zinc-900 hover:border-black/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/30")
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {!canAddToCart && (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Please select a size and color to add to cart
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              {canAddToCart ? (
                <AddToCartButton
                  product={product}
                  size={selectedSize}
                  color={selectedColor}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
                />
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-2xl bg-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-500 shadow-sm dark:bg-white/10 dark:text-zinc-400"
                >
                  Add to cart
                </button>
              )}
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                Continue shopping
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-5 text-sm text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
            <p className="font-semibold text-zinc-900 dark:text-white">
              Shipping & returns (demo)
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Ships in 1–2 business days.</li>
              <li>Easy 7-day returns.</li>
              <li>Cash on delivery not available (demo).</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
