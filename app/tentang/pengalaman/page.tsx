"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IoSchoolOutline,
  IoCodeOutline,
  IoServerOutline,
  IoRocketOutline,
} from "react-icons/io5";

import SiteHeader from "@/components/portfolio/SiteHeader";
import PageFooter from "@/components/portfolio/PageFooter";
import PageHeading from "@/components/portfolio/PageHeading";

/**
 * Cerita pengalaman berfokus pada perjalanan belajar & praktik.
 * Ubah isian di bawah sesuai data asli tanpa menyentuh logika animasi.
 */
const JOURNEY = [
  {
    icon: <IoSchoolOutline />,
    title: "Fondasi Komputer (S1)",
    period: "Sarjana Komputer",
    description:
      "Membangun dasar yang kuat: algoritma, struktur data, jaringan komputer, dan basis data — bekal utama untuk masuk ke dunia rekayasa perangkat lunak.",
  },
  {
    icon: <IoCodeOutline />,
    title: "Eksplorasi Frontend",
    period: "HTML / CSS / JavaScript → React & Next.js",
    description:
      "Belajar berbasis proyek: dari halaman statis hingga aplikasi React yang interaktif, dengan pembiasaan menulis komponen yang rapi dan reusable.",
  },
  {
    icon: <IoServerOutline />,
    title: "Belajar Backend",
    period: "Laravel & MySQL",
    description:
      "Memahami alur data aplikasi web: routing, CRUD, relasi basis data, dan konsep REST API sederhana di sisi server.",
  },
  {
    icon: <IoRocketOutline />,
    title: "Proyek Personal —步入 3D",
    period: "Next.js · TypeScript · Three.js",
    description:
      "Membangun website portfolio interaktif ini: navigasi kustom, tema dark/light, dan visualisasi 3D (WebGL) untuk pengalaman yang premium.",
  },
];

export default function Pengalaman() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ??
      false;

    if (reduce) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLDivElement>(".exp-item");

      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main
      className="
        relative isolate flex min-h-screen
        flex-col overflow-hidden
        bg-background text-foreground
        transition-colors duration-300
      "
    >
      <SiteHeader activeHref="/tentang" />

      <section
        className="
          relative z-10 flex flex-1
          px-5 py-14
          sm:px-10
          lg:px-16
        "
      >
        <div className="mx-auto w-full max-w-5xl" ref={rootRef}>
          <PageHeading
            eyebrow="Pengalaman"
            title="Learning journey"
            description="Perjalanan belajar dan praktik saya — dari fondasi komputer, frontend modern, backend, hingga membangun proyek dengan 3D interaktif."
          />

          {/* Linimasa */}
          <div
            className="
              relative ml-2 border-l border-border pl-8
              sm:ml-4
            "
          >
            {JOURNEY.map((item) => (
              <div
                key={item.title}
                className="exp-item relative pb-10 last:pb-0"
              >
                {/* Titik linimasa */}
                <span
                  className="
                    absolute -left-[41px] top-1 flex h-5 w-5
                    items-center justify-center rounded-full
                    border border-border bg-surface
                  "
                >
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>

                <div className="rounded-2xl border border-border bg-surface p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <span
                      className="
                        flex h-11 w-11 shrink-0 items-center
                        justify-center rounded-xl
                        border border-accent-border
                        bg-accent-soft text-xl text-accent
                      "
                    >
                      {item.icon}
                    </span>
                    <div>
                      <h2
                        className="
                          text-base font-semibold
                          tracking-[-0.02em] text-foreground
                        "
                      >
                        {item.title}
                      </h2>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-accent">
                        {item.period}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
