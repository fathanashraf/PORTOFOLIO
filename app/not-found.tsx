import Link from "next/link";
import { IoHomeOutline, IoArrowBackOutline } from "react-icons/io5";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-5 text-foreground">
      <div className="flex max-w-lg flex-col items-center text-center">
        <div className="relative">
          <p className="text-[clamp(8rem,20vw,16rem)] font-extrabold leading-none tracking-[-0.08em] text-accent/10">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
              Halaman Tidak Ditemukan
            </h1>
          </div>
        </div>

        <p className="mt-6 max-w-md text-sm leading-7 text-muted">
          Halaman yang kamu cari tidak tersedia atau telah dipindahkan.
          Mari kembali ke beranda untuk melanjutkan eksplorasi.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/beranda"
            className="
              group inline-flex items-center gap-3
              rounded-full bg-accent px-7 py-4
              text-xs font-semibold uppercase tracking-[0.18em] text-white
              transition-all duration-300
              hover:bg-accent-hover hover:shadow-[0_0_25px_var(--accent-glow)]
              active:scale-95
            "
          >
            <IoHomeOutline className="text-base" />
            Kembali ke Beranda
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <Link
            href="/"
            className="
              inline-flex items-center gap-3
              rounded-full border border-border px-7 py-4
              text-xs font-medium uppercase tracking-[0.18em] text-foreground
              transition-all duration-300
              hover:border-accent hover:bg-accent-soft
              active:scale-95
            "
          >
            <IoArrowBackOutline className="text-base" />
            Halaman Awal
          </Link>
        </div>
      </div>
    </main>
  );
}
