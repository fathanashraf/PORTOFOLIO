"use client";

import Link from "next/link";

import PillNav from "@/components/PillNav";
import ThemeToggle from "@/components/ThemeToogle";
import { NAV_ITEMS } from "@/components/portfolio/navItems";

/**
 * Header standar portfolio:
 * Kiri = brand, tengah = PillNav, kanan = ThemeToggle.
 * Dipakai di seluruh halaman agar konsisten.
 */
export default function SiteHeader({ activeHref }: { activeHref: string }) {
  return (
    <header
      className="
        relative z-50 flex w-full items-center
        justify-between gap-4
        px-5 pt-6
        sm:px-10
        lg:px-16
      "
    >
      <Link
        href="/beranda"
        className="
          shrink-0 text-[11px] font-semibold uppercase
          tracking-[0.3em] text-foreground
          transition-colors duration-300 hover:text-accent
          sm:text-xs
        "
      >
        Fathan Al Ashraf
      </Link>

      <div className="flex min-w-0 justify-center">
        <PillNav
          items={NAV_ITEMS}
          activeHref={activeHref}
          layout="split"
          size="md"
          surface="solid"
          itemStyle="pill"
          hoverEffect="fill"
          indicator="dot"
        />
      </div>

      <div className="shrink-0">
        <ThemeToggle />
      </div>
    </header>
  );
}
