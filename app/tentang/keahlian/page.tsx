"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiLaravel,
  SiMysql,
  SiTailwindcss,
  SiGithub,
  SiHtml5,
  SiCss,
  SiGit,
} from "react-icons/si";

import CountUp from "@/components/effects/CountUp";
import SiteHeader from "@/components/portfolio/SiteHeader";
import PageFooter from "@/components/portfolio/PageFooter";
import PageHeading from "@/components/portfolio/PageHeading";
import Reveal from "@/components/portfolio/Reveal";

/**
 * Tingkat pemahaman (self-assessment) 0–100.
 * Angka di bawah murni skala pribadi, mudah diubah.
 */
const SKILL_DATA = [
  { tech: "React", level: 75 },
  { tech: "Next.js", level: 70 },
  { tech: "TypeScript", level: 70 },
  { tech: "Laravel", level: 60 },
  { tech: "MySQL", level: 65 },
];

const TECH_STACK = [
  { label: "React", icon: <SiReact /> },
  { label: "Next.js", icon: <SiNextdotjs /> },
  { label: "TypeScript", icon: <SiTypescript /> },
  { label: "Laravel", icon: <SiLaravel /> },
  { label: "MySQL", icon: <SiMysql /> },
  { label: "Tailwind CSS", icon: <SiTailwindcss /> },
  { label: "GitHub", icon: <SiGithub /> },
  { label: "HTML", icon: <SiHtml5 /> },
  { label: "CSS", icon: <SiCss /> },
  { label: "Git", icon: <SiGit /> },
];

const ChartTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value?: number }[];
  label?: string | number;
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2 text-xs text-foreground shadow-lg">
      <span className="font-semibold">{label}</span>
      <span className="text-muted"> · {payload[0]?.value}%</span>
    </div>
  );
};

export default function Keahlian() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- gate render pasca-hidrasi; tidak ada alternatif tanpa setState di effect
    setMounted(true);
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
        <div className="mx-auto w-full max-w-6xl">
          <PageHeading
            eyebrow="Keahlian"
            title="Skills & stack"
            description="Teknologi yang saya gunakan untuk membangun aplikasi web — skala tingkat pemahaman adalah penilaian pribadi atas kedalaman praktik saya di tiap area."
          />

          {/* Statistik */}
          <Reveal>
            <div className="mt-10 grid grid-cols-2 gap-5 sm:max-w-md">
              <div className="rounded-2xl border border-border bg-surface px-6 py-5">
                <p className="text-3xl font-bold tracking-tight text-accent">
                  <CountUp
                    to={SKILL_DATA.length + TECH_STACK.length}
                    duration={1.6}
                    style={undefined}
                    decimals={undefined}
                    onStart={undefined}
                    onEnd={undefined}
                  />
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-subtle">
                  Teknologi
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface px-6 py-5">
                <p className="text-3xl font-bold tracking-tight text-accent">
                  <CountUp
                    to={SKILL_DATA.length}
                    duration={1.6}
                    style={undefined}
                    decimals={undefined}
                    onStart={undefined}
                    onEnd={undefined}
                  />
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-subtle">
                  Stack Utama
                </p>
              </div>
            </div>
          </Reveal>

          {/* Grafik Tingkat Pemahaman */}
          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                Tingkat Pemahaman
              </h2>
              <p className="mt-1 text-xs text-muted">
                Skala 0–100 · self-assessment
              </p>

              <div className="mt-6 h-[280px] w-full">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={SKILL_DATA}
                      layout="vertical"
                      margin={{ top: 4, right: 30, left: 10, bottom: 4 }}
                    >
                      <CartesianGrid
                        horizontal={false}
                        stroke="var(--border)"
                        strokeDasharray="4 6"
                      />
                      <XAxis
                        type="number"
                        domain={[0, 100]}
                        hide
                      />
                      <YAxis
                        type="category"
                        dataKey="tech"
                        width={90}
                        tickLine={false}
                        axisLine={false}
                        tick={{
                          fill: "var(--muted)",
                          fontSize: 12,
                        }}
                      />
                      <Tooltip
                        cursor={{ fill: "var(--accent-soft)" }}
                        content={<ChartTooltip />}
                      />
                      <Bar
                        dataKey="level"
                        fill="var(--accent)"
                        radius={[0, 8, 8, 0]}
                        barSize={16}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  /* Skeleton konsisten saat/awal hydrate */
                  <div className="h-full w-full animate-pulse rounded-xl bg-surface-hover" />
                )}
              </div>
            </div>
          </Reveal>

          {/* Grid ikon teknologi */}
          <Reveal delay={0.15}>
            <div className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                Technologies
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {TECH_STACK.map((tech) => (
                  <div
                    key={tech.label}
                    className="
                      group flex items-center gap-3 rounded-xl
                      border border-border bg-surface px-4 py-3
                      transition-all duration-300
                      hover:border-accent hover:bg-accent-soft
                    "
                  >
                    <span
                      className="
                        text-xl text-muted transition-colors
                        duration-300 group-hover:text-accent
                      "
                    >
                      {tech.icon}
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      {tech.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
