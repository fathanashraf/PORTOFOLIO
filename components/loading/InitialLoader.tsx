"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, reduceMotion ? 400 : 1200);

    return () => clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          aria-label="Loading"
        >
          <div className="relative">
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6"
            >
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-accent" />
                <motion.p
                  initial={reduceMotion ? {} : { letterSpacing: "0.8em" }}
                  animate={{ letterSpacing: "0.35em" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[10px] font-medium uppercase text-accent sm:text-xs"
                >
                  FATHAN AL ASHRAF
                </motion.p>
                <span className="h-px w-12 bg-accent" />
              </div>

              <motion.p
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-[9px] uppercase tracking-[0.4em] text-subtle"
              >
                Personal Portfolio
              </motion.p>
            </motion.div>

            {!reduceMotion && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-8 left-0 right-0 mx-auto h-px w-32 origin-left bg-gradient-to-r from-transparent via-accent to-transparent"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
