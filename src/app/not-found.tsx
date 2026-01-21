import Link from "next/link";

export default function NotFound() {
  return (
    <main className="rounded-3xl border border-black/10 bg-white p-10 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
      <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
        404
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
        The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
      >
        Back to shop
      </Link>
    </main>
  );
}

