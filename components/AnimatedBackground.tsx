"use client";

import Image from "next/image";
import { ReactNode, PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

interface AnimatedBackgroundProps {
  children?: ReactNode;
}

export default function AnimatedBackground({
  children,
}: AnimatedBackgroundProps) {
  const reduceMotion = useReducedMotion();

  // Posisi kursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Gerakan dibuat lebih halus
  const springConfig = {
    stiffness: 45,
    damping: 20,
    mass: 0.8,
  };

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Gerakan foto mengikuti arah kursor
  const imageX = useTransform(springX, [-0.5, 0.5], [15, -15]);
  const imageY = useTransform(springY, [-0.5, 0.5], [10, -10]);

  // Gerakan tulisan lebih kecil daripada foto
  const textX = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate flex min-h-[760px] w-full flex-col overflow-hidden bg-[#07050d] text-white sm:min-h-screen"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Purple ambient lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_65%,rgba(126,34,206,0.28),transparent_58%)]" />

        <div className="absolute left-1/2 top-[42%] h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/20 blur-[130px]" />

        <motion.div
          className="absolute bottom-[-20%] left-1/2 h-[400px] w-[650px] -translate-x-1/2 rounded-full bg-fuchsia-700/20 blur-[120px]"
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.15, 1],
                  opacity: [0.45, 0.7, 0.45],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25),transparent_35%,rgba(0,0,0,0.45))]" />

        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.045] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.5%22/%3E%3C/svg%3E')]" />
      </div>

      {/* BACKGROUND TYPOGRAPHY */}
      <motion.div
        style={reduceMotion ? undefined : { x: textX }}
        className="pointer-events-none absolute left-1/2 top-[25%] z-0 w-full -translate-x-1/2 -translate-y-1/2 select-none text-center"
      >
        <h1 className="whitespace-nowrap bg-gradient-to-b from-white via-[#d8c5ff] to-[#7440a7] bg-clip-text text-[clamp(4.5rem,16vw,15rem)] font-black leading-[0.85] tracking-[-0.085em] text-transparent">
          PORTFOLIO
        </h1>
      </motion.div>

      {/* PORTRAIT */}
      <motion.div
        style={
          reduceMotion
            ? undefined
            : {
                x: imageX,
                y: imageY,
              }
        }
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[78%] w-[min(95vw,850px)] -translate-x-1/2 sm:h-[88%]"
      >
        <motion.div
          className="relative h-full w-full"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -7, 0],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/backgraund.png"
            alt="Potret Fathan Al Ashraf"
            fill
            priority
            quality={100}
            unoptimized
            sizes="100vw"
            className="object-contain object-bottom"
          />
        </motion.div>
      </motion.div>

      {/* TOP LABEL */}
      <div className="pointer-events-none absolute left-6 right-6 top-6 z-20 flex items-center justify-between sm:left-10 sm:right-10 sm:top-8">
        <span className="text-xl font-black tracking-[-0.08em] text-white">
          FA.
        </span>

        <span className="text-sm font-bold tracking-wider text-white/80 sm:text-base">
          2026
        </span>
      </div>

      {/* BOTTOM LABEL */}
      <div className="pointer-events-none absolute bottom-5 left-6 right-6 z-20 flex items-end justify-between text-[10px] tracking-wider text-white/70 sm:bottom-8 sm:left-10 sm:right-10 sm:text-xs">
        <span>WEB DEVELOPMENT · CREATIVE TECHNOLOGY</span>
        <span>BASED IN INDONESIA</span>
      </div>

      {/* CONTENT / HERO */}
      <div className="relative z-30 flex min-h-[760px] flex-1 flex-col items-center justify-end px-6 pb-24 pt-40 text-center sm:min-h-screen sm:pb-28">
        {children}
      </div>
    </section>
  );
}