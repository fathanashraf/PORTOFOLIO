"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoRefreshOutline, IoHomeOutline, IoWarningOutline } from "react-icons/io5";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-5 text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-md flex-col items-center text-center"
      >
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-accent-border bg-accent-soft text-3xl text-accent">
          <IoWarningOutline />
        </div>

        <h1 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
          Terjadi Kesalahan
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Maaf, ada sesuatu yang tidak beres. Silakan coba lagi atau kembali ke
          beranda.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={reset}
            className="
              group inline-flex items-center gap-3
              rounded-full bg-accent px-7 py-4
              text-xs font-semibold uppercase tracking-[0.18em] text-white
              transition-all duration-300
              hover:bg-accent-hover hover:shadow-[0_0_25px_var(--accent-glow)]
              active:scale-95
            "
          >
            <IoRefreshOutline className="text-base" />
            Coba Lagi
          </button>

          <Link
            href="/beranda"
            className="
              inline-flex items-center gap-3
              rounded-full border border-border px-7 py-4
              text-xs font-medium uppercase tracking-[0.18em] text-foreground
              transition-all duration-300
              hover:border-accent hover:bg-accent-soft
              active:scale-95
            "
          >
            <IoHomeOutline className="text-base" />
            Kembali ke Beranda
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
