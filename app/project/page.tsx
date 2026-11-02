"use client";

import Link from "next/link";
import { IoArrowForward, IoTimeOutline } from "react-icons/io5";
import {
  SiLaravel,
  SiNextdotjs,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";
import { FaReact } from "react-icons/fa";

import TiltedCard from "@/components/effects/TiltedCard";
import SpotlightCard from "@/components/effects/SpotlightCard";
import SiteHeader from "@/components/portfolio/SiteHeader";
import PageFooter from "@/components/portfolio/PageFooter";
import PageHeading from "@/components/portfolio/PageHeading";
import Reveal from "@/components/portfolio/Reveal";
import { useTheme } from "@/components/ThemeProvider";

const FEATURED_TAGS = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Three.js",
];

const UPCOMING = [
  {
    icon: <SiLaravel />,
    title: "Aplikasi Web Fullstack",
    status: "Sedang Dikembangkan",
    description:
      "Membangun aplikasi web berbasis Laravel & MySQL untuk melatih routing, CRUD, relasi basis data, dan konsep REST API.",
    tags: ["Laravel", "MySQL", "PHP"],
  },
  {
    icon: <SiTailwindcss />,
    title: "Komponen UI Reusable",
    status: "Konsep",
    description:
      "Kumpulan komponen UI kecil berbasis React & Tailwind dengan tema dark/light yang konsisten, inspirasi dari ekosistem modern.",
    tags: ["React", "Tailwind"],
  },
];

export default function Project() {
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
      <SiteHeader activeHref="/project" />

      <section
        className="
          relative z-10 flex flex-1
          px-5 py-14
          sm:px-10
          lg:px-16
        "
      >
        <div className="mx-auto w-full max-w-6xl">
          <PageHeading
            eyebrow="Project"
            title="Selected work"
            description="Proyek personal yang sedang dan telah saya bangun untuk mengasah kemampuan pengembangan web modern."
          />

          {/* PROYEK UNGGULAN — TILTED CARD (React Bits) */}
          <Reveal>
            <div className="mt-10 flex flex-col items-center justify-center">
              <TiltedCard
                imageSrc="/images/backgraund.png"
                altText="Personal Portfolio Website"
                captionText=""
                flipped={undefined}
                onFlip={undefined}
                backContent={undefined}
                onClick={undefined}
                style={undefined}
                containerHeight="380px"
                containerWidth="100%"
                imageHeight="380px"
                imageWidth="100%"
                scaleOnHover={1.04}
                rotateAmplitude={10}
                showTooltip={false}
                flipOnClick={false}
                radius={15}
                displayOverlayContent
                overlayContent={
                  <div
                    className="
                      pointer-events-none absolute inset-x-6 bottom-6
                      rounded-xl border border-border bg-background/80
                      px-5 py-4 backdrop-blur-md
                    "
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.3em] text-accent">
                          Featured
                        </p>
                        <h2 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-foreground">
                          Personal Portfolio Website
                        </h2>
                      </div>

                      <div className="hidden gap-2 text-xl text-accent sm:flex">
                        <SiNextdotjs />
                        <SiTypescript />
                        <FaReact />
                        <SiThreedotjs />
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {FEATURED_TAGS.map((tag) => (
                        <span
                          key={tag}
                          className="
                            rounded-full border border-border
                            bg-surface px-3 py-1 text-[10px]
                            font-medium text-muted
                          "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                }
              >
                {undefined}
              </TiltedCard>

              <p className="mt-4 text-sm text-muted">
                Website portfolio interaktif milik saya sendiri — navigasi
                kustom, tema dark/light, visual 3D (WebGL), dan animasi
                Motion.
              </p>
            </div>
          </Reveal>

          {/* PROYEK DALAM PENGEMBANGAN */}
          <div className="mt-12">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 shrink-0 bg-accent" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                Dalam Pengembangan
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {UPCOMING.map((project, index) => (
                <Reveal key={project.title} delay={index * 0.08}>
                  <SpotlightCard
                    theme={isLight ? "light" : "dark"}
                    spotlightColor={isLight ? "#0d9488" : "#38bdf8"}
                    intensity={0.12}
                    style={undefined}
                    className="
                      h-full rounded-2xl border border-border
                      bg-surface p-6
                    "
                  >
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <span
                        className="
                          flex h-11 w-11 items-center
                          justify-center rounded-xl
                          border border-accent-border
                          bg-accent-soft text-xl text-accent
                        "
                      >
                        {project.icon}
                      </span>

                      <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-muted">
                        <IoTimeOutline size={13} />
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold tracking-[-0.02em] text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-6 text-muted">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="
                            rounded-full border border-border
                            px-3 py-1 text-[10px] font-medium text-muted
                          "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-border bg-surface px-7 py-6">
              <p className="text-sm text-muted">
                Ingin lihat bagaimana proyek-proyek ini dibangun, atau
                berkolaborasi?
              </p>
              <Link
                href="/kontak"
                className="
                  group inline-flex items-center gap-3
                  rounded-full bg-accent px-6 py-3
                  text-xs font-semibold uppercase
                  tracking-[0.18em] text-white
                  transition-all duration-300
                  hover:bg-accent-hover active:scale-95
                "
              >
                Hubungi Saya
                <IoArrowForward
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                  size={15}
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
