"use client";

import BlurText from "@/components/effects/BlurText";
import Reveal from "@/components/portfolio/Reveal";

interface PageHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

/**
 * Heading halaman standar: eyebrow accent + judul besar
 * dengan efek React Bits BlurText + deskripsi opsional.
 */
export default function PageHeading({
  eyebrow,
  title,
  description,
}: PageHeadingProps) {
  return (
    <Reveal>
      <div className="mb-8 flex items-center gap-4">
        <span className="h-px w-10 shrink-0 bg-accent" />
        <p
          className="
            text-[10px] font-medium uppercase
            tracking-[0.35em] text-accent
            sm:text-xs
          "
        >
          {eyebrow}
        </p>
      </div>

      <BlurText
        text={title}
        delay={120}
        animationFrom={undefined}
        animationTo={undefined}
        easing={undefined}
        onAnimationComplete={undefined}
        color={undefined}
        fromColor={undefined}
        className="
          text-4xl font-extrabold uppercase
          leading-[1.02] tracking-[-0.04em] text-foreground
          sm:text-5xl lg:text-6xl
        "
      />

      {description ? (
        <p
          className="
            mt-5 max-w-2xl text-sm leading-8 text-muted
            sm:text-base
          "
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
