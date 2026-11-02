"use client";

import Image from "next/image";
import {
  IoPerson,
  IoLocationOutline,
  IoSchoolOutline,
  IoCodeOutline,
  IoBriefcaseOutline,
} from "react-icons/io5";

import SiteHeader from "@/components/portfolio/SiteHeader";
import PageFooter from "@/components/portfolio/PageFooter";
import PageHeading from "@/components/portfolio/PageHeading";
import Reveal from "@/components/portfolio/Reveal";

const IDENTITY_ROWS = [
  {
    icon: <IoPerson />,
    label: "Nama",
    value: "Fathan Al Ashraf",
  },
  {
    icon: <IoSchoolOutline />,
    label: "Pendidikan",
    value: "Sarjana Komputer (S1)",
  },
  {
    icon: <IoBriefcaseOutline />,
    label: "Status",
    value: "Aspiring Web Developer",
  },
  {
    icon: <IoCodeOutline />,
    label: "Fokus Saat Ini",
    value: "Web Development",
  },
  {
    icon: <IoLocationOutline />,
    label: "Domisili",
    value: "Indonesia",
  },
];

export default function DataDiri() {
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
        <div className="mx-auto grid w-full max-w-7xl items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* KIRI — FOTO */}
          <Reveal className="mx-auto w-full max-w-[380px] lg:ml-auto lg:mr-0">
            <div
              className="
                relative aspect-[4/5] w-full
                overflow-hidden rounded-2xl
                border border-border bg-surface
              "
            >
              <Image
                src="/images/Fathan_Al_Ashraf.jpg"
                alt="Foto Fathan Al Ashraf"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 380px"
                className="object-cover object-top"
              />
            </div>

            <p
              className="
                mt-4 text-center text-[10px] uppercase
                tracking-[0.3em] text-subtle
              "
            >
              Personal Identity
            </p>
          </Reveal>

          {/* KANAN — INFORMASI */}
          <div>
            <PageHeading
              eyebrow="Data Diri"
              title="Personal information"
              description="Halo, saya Fathan Al Ashraf. Sarjana Komputer dan aspiring web developer yang antusias membangun website modern, responsif, dan memberikan pengalaman terbaik bagi penggunanya."
            />

            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
              {IDENTITY_ROWS.map((row, index) => (
                <Reveal key={row.label} delay={index * 0.06}>
                  <div
                    className="
                      flex items-center gap-4 px-6 py-4
                      transition-colors duration-300 hover:bg-surface-hover
                    "
                  >
                    <span
                      className="
                        flex h-10 w-10 shrink-0 items-center
                        justify-center rounded-xl
                        border border-accent-border
                        bg-accent-soft text-lg text-accent
                      "
                    >
                      {row.icon}
                    </span>

                    <div>
                      <p
                        className="
                          text-[9px] uppercase
                          tracking-[0.25em] text-subtle
                        "
                      >
                        {row.label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">
                        {row.value}
                      </p>
                    </div>
                  </div>

                  {index < IDENTITY_ROWS.length - 1 ? (
                    <div className="h-px w-full bg-border" />
                  ) : null}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
