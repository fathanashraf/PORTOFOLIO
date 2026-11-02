"use client";

import { IoWarningOutline, IoRefreshOutline } from "react-icons/io5";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body className="bg-background text-foreground">
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5">
          <div className="flex max-w-md flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-accent-border bg-accent-soft text-3xl text-accent">
              <IoWarningOutline />
            </div>

            <h1 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              Kesalahan Fatal
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted">
              Terjadi kesalahan yang sangat serius. Silakan muat ulang halaman.
            </p>

            <button
              onClick={reset}
              className="
                mt-8 inline-flex items-center gap-3
                rounded-full bg-accent px-7 py-4
                text-xs font-semibold uppercase tracking-[0.18em] text-white
                transition-all duration-300
                hover:bg-accent-hover
                active:scale-95
              "
            >
              <IoRefreshOutline className="text-base" />
              Muat Ulang
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
