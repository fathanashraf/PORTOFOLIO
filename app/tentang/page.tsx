"use client";

import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import {
  FaIdCard,
  FaBriefcase,
  FaCode,
  FaGraduationCap,
} from "react-icons/fa";

import SpotlightCard from "@/components/effects/SpotlightCard";
import SiteHeader from "@/components/portfolio/SiteHeader";
import PageFooter from "@/components/portfolio/PageFooter";
import PageHeading from "@/components/portfolio/PageHeading";
import Reveal from "@/components/portfolio/Reveal";
import { useTheme } from "@/components/ThemeProvider";

const SECTIONS = [
  {
    label: "Data Diri",
    href: "/tentang/data-diri",
    icon: <FaIdCard />,
    description:
      "Identitas singkat: siapa saya, fokus saat ini, dan arah yang sedang saya kejar.",
  },
  {
    label: "Pengalaman",
    href: "/tentang/pengalaman",
    icon: <FaBriefcase />,
    description:
      "Perjalanan belajar dan praktik — dari fondasi komputer hingga membangun website modern.",
  },
  {
    label: "Keahlian",
    href: "/tentang/keahlian",
    icon: <FaCode />,
    description:
      "Teknologi yang saya gunakan: React, Next.js, TypeScript, Laravel, dan MySQL.",
  },
  {
    label: "Pendidikan",
    href: "/tentang/pendidikan",
    icon: <FaGraduationCap />,
    description:
      "Latar belakang pendidikan formal dan pembelajaran mandiri yang saya jalankan.",
  },
];

export default function Tentang() {
  const { theme } = useTheme();
  const isLight = theme === "light";

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
            eyebrow="Tentang Saya"
            title="Get to know me"
            description="Sarjana Komputer dan aspiring web developer yang tertarik membangun website modern, responsif, serta aplikasi digital yang fungsional dan bermanfaat bagi penggunanya."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SECTIONS.map((section, index) => (
              <Reveal key={section.href} delay={index * 0.08}>
                <Link href={section.href} className="group block h-full">
                  <SpotlightCard
                    theme={isLight ? "light" : "dark"}
                    spotlightColor={isLight ? "#0d9488" : "#38bdf8"}
                    intensity={0.12}
                    style={undefined}
                    className="
                      h-full rounded-2xl border border-border
                      bg-surface p-6
                      transition-colors duration-300
                      group-hover:border-accent
                    "
                  >
                    <div
                      className="
                        mb-5 flex h-11 w-11 items-center
                        justify-center rounded-xl
                        border border-accent-border
                        bg-accent-soft text-xl text-accent
                      "
                    >
                      {section.icon}
                    </div>

                    <h2
                      className="
                        text-base font-semibold
                        tracking-[-0.02em] text-foreground
                      "
                    >
                      {section.label}
                    </h2>

                    <p className="mt-2 text-[13px] leading-6 text-muted">
                      {section.description}
                    </p>

                    <span
                      className="
                        mt-5 inline-flex items-center gap-2
                        text-[10px] font-medium uppercase
                        tracking-[0.25em] text-accent
                        transition-transform duration-300
                        group-hover:translate-x-1
                      "
                    >
                      Lihat Selengkapnya
                      <IoArrowForward size={14} />
                    </span>
                  </SpotlightCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
