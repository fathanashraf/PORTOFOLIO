
"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

import {
  IoSunny,
  IoMoon,
} from "react-icons/io5";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="
      relative isolate flex min-h-screen flex-col
      overflow-hidden bg-background text-foreground
      transition-colors duration-300
    ">

      {/* =========================================
          HEADER — THEME TOGGLE
      ========================================= */}

      <header className="
        relative z-20 flex w-full items-center
        justify-end px-6 pt-6
        sm:px-10 lg:px-16
      ">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "dark"
              ? "Aktifkan light mode"
              : "Aktifkan dark mode"
          }
          title={
            theme === "dark"
              ? "Light Mode"
              : "Dark Mode"
          }
          className="
            flex h-11 w-11 shrink-0 items-center
            justify-center rounded-full

            border border-border
            bg-surface
            text-accent

            shadow-sm
            transition-all duration-300

            hover:border-accent
            hover:bg-accent-soft
            hover:shadow-[0_0_20px_var(--accent-glow)]

            active:scale-95
          "
        >
          {theme === "dark" ? (
            <IoSunny className="text-xl" />
          ) : (
            <IoMoon className="text-xl" />
          )}
        </button>
      </header>


      {/* =========================================
          HERO SECTION
      ========================================= */}

      <section className="
        relative z-10 flex flex-1
        items-center px-6 py-16

        sm:px-10 sm:py-20
        lg:px-16 lg:py-24
      ">
        <div className="
          mx-auto w-full max-w-7xl
        ">

          <div className="max-w-4xl">

            {/* Eyebrow */}

            <div className="
              mb-8 flex items-center gap-4
            ">
              <span className="
                h-px w-10 shrink-0 bg-accent
              " />

              <p className="
                text-[10px] font-medium uppercase
                tracking-[0.35em] text-accent

                sm:text-xs
              ">
                Personal Portfolio · 2026
              </p>
            </div>


            {/* Main Heading */}

            <h1 className="
              text-5xl font-light leading-[1.08]
              tracking-[-0.055em]

              sm:text-7xl
              lg:text-8xl
            ">
              Crafting digital

              <br />

              <span className="
                font-serif italic text-accent
              ">
                experiences.
              </span>
            </h1>


            {/* Description */}

            <p className="
              mt-8 max-w-xl
              text-sm leading-8 text-muted

              sm:text-base
            ">
              Halo, saya Fathan Al Ashraf. Seorang calon
              Web Developer dengan ketertarikan pada
              pengembangan website, teknologi, dan
              pengalaman digital yang fungsional serta
              menarik.
            </p>


            {/* Action Buttons */}

            <div className="
              mt-10 flex flex-wrap items-center gap-4
            ">

              {/* Primary Button */}

              <Link
                href="/beranda"
                className="
                  group inline-flex items-center gap-4
                  rounded-full

                  bg-accent px-7 py-4
                  text-xs font-semibold uppercase
                  tracking-[0.18em]

                  text-white

                  transition-all duration-300

                  hover:bg-accent-hover
                  hover:shadow-[0_0_30px_var(--accent-glow)]

                  active:scale-[0.97]
                "
              >
                Jelajahi

                <span className="
                  transition-transform duration-300
                  group-hover:translate-x-1
                ">
                  ↗
                </span>
              </Link>


              {/* Secondary Button */}

              <Link
                href="/tentang"
                className="
                  inline-flex items-center gap-3
                  rounded-full

                  border border-border
                  px-7 py-4

                  text-xs font-medium uppercase
                  tracking-[0.18em]

                  text-foreground

                  transition-all duration-300

                  hover:border-accent
                  hover:bg-accent-soft

                  active:scale-[0.97]
                "
              >
                Tentang Saya
              </Link>

            </div>

          </div>


          {/* =====================================
              BOTTOM INFORMATION
          ===================================== */}

          <div className="
            mt-20 flex flex-col justify-between
            gap-5 border-t border-border pt-6

            sm:mt-24
            sm:flex-row sm:items-center
            sm:gap-4
          ">

            <p className="
              text-[10px] uppercase
              tracking-[0.25em] text-subtle
            ">
              Based in Indonesia
            </p>

            <p className="
              text-[10px] uppercase
              tracking-[0.25em] text-subtle
            ">
              Web Development · Creative Technology
            </p>

            <p className="
              text-[10px] uppercase
              tracking-[0.25em] text-accent
            ">
              Available for Opportunities
            </p>

          </div>

        </div>
      </section>

    </main>
  );
}
