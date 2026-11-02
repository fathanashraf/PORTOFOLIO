"use client";

import Image from "next/image";
import {
  IoSchoolOutline,
  IoBookOutline,
  IoRocketOutline,
} from "react-icons/io5";

import CountUp from "@/components/effects/CountUp";
import SiteHeader from "@/components/portfolio/SiteHeader";
import PageFooter from "@/components/portfolio/PageFooter";
import PageHeading from "@/components/portfolio/PageHeading";
import Reveal from "@/components/portfolio/Reveal";

const EDUCATION = [
  {
    icon: <IoSchoolOutline />,
    title: "Sarjana Komputer (S1)",
    period: "Lulus — Wisuda",
    description:
      "Pendidikan formal komputer: algoritma, struktur data, jaringan, dan basis data sebagai fondasi rekayasa perangkat lunak dan pengembangan web.",
  },
  {
    icon: <IoBookOutline />,
    title: "Pembelajaran Mandiri",
    period: "Berkelanjutan",
    description:
      "Kursus online, dokumentasi resmi, dan pembelajaran berbasis proyek untuk mendalami React, Next.js, TypeScript, Laravel, serta MySQL.",
  },
  {
    icon: <IoRocketOutline />,
    title: "Perkembangan Ekosistem",
    period: "Sekarang",
    description:
      "Mengikuti evolusi ekosistem JavaScript/TypeScript dan tooling modern terus-menerus agar bisa membangun produk yang cepat, aksesibel, dan interaktif.",
  },
];

export default function Pendidikan() {
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
        <div className="mx-auto w-full max-w-7xl">
          <PageHeading
            eyebrow="Pendidikan"
            title="Education"
            description="Latar belakang pendidikan formal dan pembelajaran mandiri yang membentuk cara saya membangun aplikasi web."
          />

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* KIRI — kartu pendidikan */}
            <div>
              {EDUCATION.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.08}>
                  <div
                    className="
                      mb-4 rounded-2xl border border-border
                      bg-surface p-6
                      transition-all duration-300
                      hover:border-accent
                    "
                  >
                    <div className="flex items-start gap-4">
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
                        <h2 className="text-base font-semibold tracking-[-0.02em] text-foreground">
                          {item.title}
                        </h2>
                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-accent">
                          {item.period}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-muted">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* KANAN — foto wisuda & statistik */}
            <Reveal delay={0.15} className="mx-auto w-full max-w-[420px] lg:ml-auto lg:mr-0">
              <div
                className="
                  relative aspect-[4/3] w-full
                  overflow-hidden rounded-2xl
                  border border-border bg-surface
                "
              >
                <Image
                  src="/images/wisuda.png"
                  alt="Momen wisuda Fathan Al Ashraf"
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover"
                />
              </div>

              <p
                className="
                  mt-4 text-center text-[10px] uppercase
                  tracking-[0.3em] text-subtle
                "
              >
                Wisuda — Sarjana Komputer
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-surface px-5 py-4">
                  <p className="text-2xl font-bold tracking-tight text-accent">
                    <CountUp
                      to={1}
                      duration={1.2}
                      style={undefined}
                      decimals={undefined}
                      onStart={undefined}
                      onEnd={undefined}
                    />
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-subtle">
                    Gelar S1
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface px-5 py-4">
                  <p className="text-2xl font-bold tracking-tight text-accent">
                    <CountUp
                      to={3}
                      duration={1.6}
                      style={undefined}
                      decimals={undefined}
                      onStart={undefined}
                      onEnd={undefined}
                    />
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-subtle">
                    Fokus Belajar
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
