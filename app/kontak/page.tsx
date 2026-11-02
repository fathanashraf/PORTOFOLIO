"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  IoCheckmarkCircle,
  IoMailOutline,
  IoSend,
} from "react-icons/io5";
import { FaGithub, FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { toast } from "sonner";

import TextType from "@/components/effects/TextType";
import SiteHeader from "@/components/portfolio/SiteHeader";
import PageFooter from "@/components/portfolio/PageFooter";
import PageHeading from "@/components/portfolio/PageHeading";
import Reveal from "@/components/portfolio/Reveal";

/**
 * TODO: isi username/URL media sosial asli milikmu di array SOCIALS.
 */
const SOCIALS = [
  { label: "GitHub", href: "#", icon: <FaGithub /> },
  { label: "Instagram", href: "#", icon: <FaInstagram /> },
  { label: "LinkedIn", href: "#", icon: <FaLinkedin /> },
  { label: "Facebook", href: "#", icon: <FaFacebook /> },
];

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter."),
  email: z
    .string()
    .min(1, "Email wajib diisi.")
    .email("Format email tidak valid."),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter."),
});

type ContactForm = z.infer<typeof contactSchema>;

const inputClass = (hasError?: boolean) =>
  `
    w-full rounded-xl border bg-surface px-4 py-3
    text-sm text-foreground outline-none
    placeholder:text-subtle
    transition-colors duration-300
    ${hasError ? "border-red-400/70" : "border-border"}
    focus:border-accent
  `;

export default function Kontak() {
  const [submitted, setSubmitted] = useState<ContactForm | null>(null);
  const [last, setLast] = useState<ContactForm | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setLast(data);
        setSubmitted(data);
        reset();
        toast.success("Pesan berhasil dikirim", {
          description: "Terima kasih atas pesan yang kamu kirimkan.",
        });
      } else {
        toast.error("Gagal mengirim pesan", {
          description: "Silakan coba lagi atau kirim langsung via email.",
        });
      }
    } catch (error) {
      toast.error("Gagal mengirim pesan", {
        description: "Silakan coba lagi atau kirim langsung via email.",
      });
    }
  };

  const mailtoHref = last
    ? `mailto:?subject=${encodeURIComponent(
        `Pesan dari ${last.name} — Portfolio`,
      )}&body=${encodeURIComponent(
        `${last.message}\n\nDari: ${last.name} <${last.email}>`,
      )}`
    : "mailto:";

  return (
    <main
      className="
        relative isolate flex min-h-screen
        flex-col overflow-hidden
        bg-background text-foreground
        transition-colors duration-300
      "
    >
      <SiteHeader activeHref="/kontak" />

      <section
        className="
          relative z-10 flex flex-1
          px-5 py-14
          sm:px-10
          lg:px-16
        "
      >
        <div className="mx-auto grid w-full max-w-6xl items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* KIRI — INFO & SOSIAL */}
          <div>
            <PageHeading
              eyebrow="Kontak"
              title="Get in touch"
              description=""
            />

            <p className="mt-1 min-h-[1.6em] text-sm text-muted sm:text-base">
              <TextType
                text={[
                  "Ada ide atau proyek yang ingin dibahas?",
                  "Mari diskusi & kolaborasi bersama.",
                ]}
                typingSpeed={55}
                pauseDuration={2200}
                loop
                showCursor
                variableSpeed={undefined}
                onSentenceComplete={undefined}
                className="text-sm text-muted sm:text-base"
              />
            </p>

            <Reveal delay={0.1}>
              <div className="mt-8 space-y-4">
                <a
                  href={mailtoHref}
                  className="
                    flex items-center gap-4 rounded-2xl
                    border border-border bg-surface px-6 py-4
                    transition-all duration-300
                    hover:border-accent hover:bg-accent-soft
                  "
                >
                  <span
                    className="
                      flex h-11 w-11 items-center justify-center
                      rounded-xl border border-accent-border
                      bg-accent-soft text-xl text-accent
                    "
                  >
                    <IoMailOutline />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Kirim Email
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      Buka aplikasi email kamu
                    </p>
                  </div>
                </a>

                <div className="rounded-2xl border border-border bg-surface px-6 py-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-subtle">
                    Media Sosial
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {SOCIALS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        title={social.label}
                        className="
                          flex h-11 w-11 items-center justify-center
                          rounded-full border border-border
                          bg-surface text-lg text-muted
                          transition-all duration-300
                          hover:border-accent hover:bg-accent-soft
                          hover:text-accent hover:scale-105
                        "
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* KANAN — FORMULIR (React Hook Form + Zod) */}
          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <IoCheckmarkCircle
                    className="text-5xl text-accent"
                    aria-hidden="true"
                  />
                  <h2 className="mt-4 text-lg font-semibold text-foreground">
                    Pesan siap dikirim!
                  </h2>
                  <p className="mt-2 max-w-sm text-sm leading-7 text-muted">
                    Formulir belum terhubung ke server. Gunakan tombol di
                    bawah untuk mengirimnya melalui aplikasi email kamu,
                    atau kirim ulang kapan pun lewat formulir ini.
                  </p>
                  <a
                    href={mailtoHref}
                    className="
                      mt-6 inline-flex items-center gap-3
                      rounded-full bg-accent px-6 py-3
                      text-xs font-semibold uppercase
                      tracking-[0.18em] text-white
                      transition-all duration-300
                      hover:bg-accent-hover active:scale-95
                    "
                  >
                    Buka Aplikasi Email
                    <IoSend size={14} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(null)}
                    className="
                      mt-4 text-[10px] uppercase tracking-[0.25em]
                      text-subtle transition-colors duration-300
                      hover:text-accent
                    "
                  >
                    Tulis Pesan Baru
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="
                        mb-2 block text-[10px] font-medium uppercase
                        tracking-[0.25em] text-muted
                      "
                    >
                      Nama
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Nama lengkap kamu"
                      className={inputClass(Boolean(errors.name))}
                      aria-invalid={Boolean(errors.name)}
                      {...register("name")}
                    />
                    {errors.name ? (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.name.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="
                        mb-2 block text-[10px] font-medium uppercase
                        tracking-[0.25em] text-muted
                      "
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      className={inputClass(Boolean(errors.email))}
                      aria-invalid={Boolean(errors.email)}
                      {...register("email")}
                    />
                    {errors.email ? (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.email.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="
                        mb-2 block text-[10px] font-medium uppercase
                        tracking-[0.25em] text-muted
                      "
                    >
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Ceritakan kebutuhan atau ide yang ingin didiskusikan…"
                      className={inputClass(Boolean(errors.message))}
                      aria-invalid={Boolean(errors.message)}
                      {...register("message")}
                    />
                    {errors.message ? (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.message.message}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      inline-flex w-full items-center justify-center gap-3
                      rounded-full bg-accent px-7 py-4
                      text-xs font-semibold uppercase
                      tracking-[0.18em] text-white
                      transition-all duration-300
                      hover:bg-accent-hover
                      hover:shadow-[0_0_25px_var(--accent-glow)]
                      active:scale-[0.98]
                      disabled:cursor-not-allowed disabled:opacity-60
                    "
                  >
                    {isSubmitting ? "Mengirim…" : "Kirim Pesan"}
                    <IoSend size={15} />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
