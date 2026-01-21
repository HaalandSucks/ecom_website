"use client";

import { useMemo, useState } from "react";
import type { Product, ProductCategory } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const categories: Array<"All" | ProductCategory> = ["All", "Women", "Men"];

export function ProductGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = active === "All" ? true : p.category === active;
      const matchesQuery =
        q.length === 0
          ? true
          : `${p.name} ${p.description}`.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [active, query, products]);

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => {
            const isActive = c === active;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={
                  "rounded-full px-4 py-2 text-sm font-semibold transition " +
                  (isActive
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "border border-black/10 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10")
                }
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="w-full sm:max-w-sm">
          <label className="sr-only" htmlFor="search">
            Search products
          </label>
          <input
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shirts, dresses, denim..."
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-zinc-400 dark:focus:border-white/20"
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6 text-sm text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
          No products match your search.
        </div>
      ) : null}
    </section>
  );
}

