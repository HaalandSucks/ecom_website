import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { AddToCartButton } from "@/components/AddToCartButton";

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProductCard({ product }: { product: Product }) {
  const hasDiscount =
    typeof product.compareAtPrice === "number" &&
    product.compareAtPrice > product.price;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5">
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-white/5">
        <Link href={`/product/${product.slug}`} className="block">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            priority={false}
          />
        </Link>

        {product.badges?.length ? (
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.badges.slice(0, 2).map((b) => (
              <span
                key={b}
                className="rounded-full bg-black px-2.5 py-1 text-xs font-semibold text-white shadow-sm dark:bg-white dark:text-black"
              >
                {b}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
              {product.category}
            </p>
            <Link href={`/product/${product.slug}`} className="block">
              <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-zinc-900 dark:text-white">
                {product.name}
              </h3>
            </Link>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              {formatINR(product.price)}
            </p>
            {hasDiscount ? (
              <p className="text-xs text-zinc-500 line-through dark:text-zinc-400">
                {formatINR(product.compareAtPrice!)}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-zinc-600 dark:text-zinc-300">
            ★ {product.rating.toFixed(1)}{" "}
            <span className="text-zinc-400">({product.reviewCount})</span>
          </p>
          <div className="flex items-center gap-2">
            <AddToCartButton
              product={product}
              className="rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
            />
            <Link
              href={`/product/${product.slug}`}
              className="rounded-full border border-black/10 px-2.5 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-200 dark:hover:bg-white/10"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

