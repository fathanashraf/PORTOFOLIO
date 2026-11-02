"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

import SiteHeader from "@/components/portfolio/SiteHeader";
import PageFooter from "@/components/portfolio/PageFooter";
import LanyardLoader from "@/components/loading/LanyardLoader";

const Lanyard = dynamic(() => import("@/components/lanyard/Lanyard"), {
  ssr: false,
  loading: () => <LanyardLoader />,
});

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE_OUT },
  }),
};

export default function Beranda() {
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();

  return (
    <main
      className="
        relative isolate flex min-h-screen
        flex-col overflow-hidden
        bg-background text-foreground
        transition-colors duration-300
      "
    >
      {/* HEADER / NAVBAR */}
      <SiteHeader activeHref="/beranda" />

      {/* =========================================
          HERO — DUA KOLOM (DESKTOP)
      ========================================= */}
      <section
        className="
          relative z-10 flex flex-1 items-center
          px-5 py-14
          sm:px-10
          lg:px-16
        "
      >
        <div
          className="
            mx-auto grid w-full max-w-7xl items-center
            gap-12
            lg:grid-cols-[1.1fr_0.9fr]
            lg:gap-16
          "
        >
          {/* KIRI — TYPOGRAPHY & DESKRIPSI */}
          <div>
            {/* Eyebrow */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial={reduceMotion ? "visible" : "hidden"}
              animate="visible"
              className="mb-7 flex items-center gap-4"
            >
              <span className="h-px w-10 shrink-0 bg-accent" />
              <p
                className="
                  text-[10px] font-medium uppercase
                  tracking-[0.35em] text-accent
                  sm:text-xs
                "
              >
                Personal Portfolio · 2026
              </p>
            </motion.div>

            {/* Judul utama */}
            <div className="relative">
              <motion.span
                custom={0.12}
                variants={fadeUp}
                initial={reduceMotion ? "visible" : "hidden"}
                animate="visible"
                aria-hidden="true"
                className="
                  relative z-10 -mb-3 ml-1 block
                  font-serif text-3xl italic leading-none
                  tracking-tight text-accent
                  sm:text-4xl
                  lg:-mb-4 lg:text-5xl
                "
              >
                Creative
              </motion.span>

              <motion.h1
                custom={0.2}
                variants={fadeUp}
                initial={reduceMotion ? "visible" : "hidden"}
                animate="visible"
                className="
                  text-[clamp(3.4rem,8.5vw,7rem)]
                  font-extrabold uppercase
                  leading-[0.95] tracking-[-0.05em]
                  text-foreground
                "
              >
                Portfolio
              </motion.h1>
            </div>

            {/* Deskripsi */}
            <motion.p
              custom={0.32}
              variants={fadeUp}
              initial={reduceMotion ? "visible" : "hidden"}
              animate="visible"
              className="
                mt-8 max-w-xl text-sm leading-8 text-muted
                sm:text-base
              "
            >
              Halo, saya{" "}
              <span className="font-semibold text-foreground">
                Fathan Al Ashraf
              </span>
              . Sarjana Komputer dan Aspiring Web Developer yang memiliki
              ketertarikan dalam membangun website modern, responsif, serta
              aplikasi digital yang fungsional dan memberikan pengalaman
              terbaik bagi penggunanya.
            </motion.p>

            {/* Tombol */}
            <motion.div
              custom={0.42}
              variants={fadeUp}
              initial={reduceMotion ? "visible" : "hidden"}
              animate="visible"
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/project"
                className="
                  group inline-flex items-center gap-3
                  rounded-full bg-accent px-7 py-4
                  text-xs font-semibold uppercase
                  tracking-[0.18em] text-white
                  transition-all duration-300
                  hover:bg-accent-hover
                  hover:shadow-[0_0_25px_var(--accent-glow)]
                  active:scale-95
                "
              >
                Explore My Work
                <span
                  className="
                    text-base transition-transform
                    duration-300 group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </Link>

              <Link
                href="/tentang"
                className="
                  inline-flex items-center gap-3
                  rounded-full border border-border
                  px-7 py-4
                  text-xs font-medium uppercase
                  tracking-[0.18em] text-foreground
                  transition-all duration-300
                  hover:border-accent
                  hover:bg-accent-soft
                  active:scale-95
                "
              >
                About Me
              </Link>
            </motion.div>
          </div>

          {/* KANAN — 3D LANYARD ID CARD */}
          <motion.div
            initial={
              reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 24 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT }}
            className="
              relative mx-auto w-full max-w-[420px]
              sm:max-w-[460px]
              lg:max-w-[500px]
            "
          >
            {/* Canvas transparan — menyatu dengan background halaman */}
            <div className="relative h-[400px] w-full sm:h-[480px] lg:h-[540px]">
              <Lanyard
                frontImage="/images/Fathan_Al_Ashraf.jpg"
                backImage="/images/logo-fathan.jpg"
                cardColor="#f8faf9"
                orientation="portrait"
                finish="glossy"
                metal="silver"
                cornerRadius={0.3}
                size={0.62}
                anchor="center"
                strapLength={0.5}
                strapColor={theme === "light" ? "#0d9488" : "#38bdf8"}
                strapWidth={0.65}
                gravity={1}
                damping={0.5}
                elasticity={0.4}
                breeze={0.3}
                interactive
                intro
              />
            </div>

            {/* Caption kecil di bawah lanyard */}
            <p
              className="
                mt-1 text-center text-[10px] uppercase
                tracking-[0.3em] text-subtle
              "
            >
              Drag · Flick · Web Development · Creative Technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER / INFORMASI BAWAH */}
      <PageFooter />
    </main>
  );
}
