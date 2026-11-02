"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { IoArrowUp } from "react-icons/io5";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          className="
            fixed bottom-6 right-6 z-50
            flex h-11 w-11 items-center justify-center
            rounded-full border border-border bg-surface
            text-accent shadow-lg
            transition-all duration-300
            hover:border-accent hover:bg-accent-soft
            hover:shadow-[0_0_20px_var(--accent-glow)]
            active:scale-95
          "
        >
          <IoArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
