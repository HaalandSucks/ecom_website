export function Footer() {
  return (
    <footer className="border-t border-black/5 py-10 text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="font-semibold text-zinc-900 dark:text-white">
            Ecom Closet
          </span>{" "}
          — demo store for men & women clothing.
        </p>
        <p className="text-zinc-500 dark:text-zinc-400">
          Built with Next.js 15 + Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}

