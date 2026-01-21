import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden rounded-3xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_60rem_at_10%_10%,rgba(0,0,0,0.06),transparent_60%),radial-gradient(50rem_50rem_at_90%_20%,rgba(0,0,0,0.05),transparent_55%)] dark:bg-[radial-gradient(60rem_60rem_at_10%_10%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(50rem_50rem_at_90%_20%,rgba(255,255,255,0.06),transparent_55%)]" />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
              Men & Women Clothing
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Simple. Stylish. Everyday essentials.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg">
              Browse a curated set of dummy products for men and women. Clean UI,
              responsive layout, and smooth navigation—ready to extend into a
              real store.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#shop"
                className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
              >
                Shop collection
              </a>
              <Link
                href="/product/womens-wrap-dress"
                className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                Featured item
              </Link>
            </div>
          </div>

          <div className="grid w-full max-w-xl grid-cols-2 gap-4">
            <div className="rounded-3xl border border-black/10 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
                Free delivery
              </p>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                On orders above ₹1,999 (demo)
              </p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
                Easy returns
              </p>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                7-day return window (demo)
              </p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
                Secure checkout
              </p>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                Payments not enabled (demo)
              </p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
                New arrivals
              </p>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                Updated styles weekly (demo)
              </p>
            </div>
          </div>
        </div>
      </section>

      <div id="shop" className="mt-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Shop products
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Filter by category or search by name.
            </p>
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-300">
            {products.length} items
          </div>
        </div>

        <ProductGrid products={products} />
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <section
          id="women"
          className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
        >
          <h3 className="text-lg font-semibold">Women</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Dresses, blazers, tops, trousers and more.
          </p>
          <a
            href="#shop"
            className="mt-4 inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            Browse women
          </a>
        </section>

        <section
          id="men"
          className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
        >
          <h3 className="text-lg font-semibold">Men</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Shirts, jeans, polos, jackets and essentials.
          </p>
          <a
            href="#shop"
            className="mt-4 inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            Browse men
          </a>
        </section>
      </div>
    </main>
  );
}
