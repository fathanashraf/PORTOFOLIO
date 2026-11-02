"use client";

import { motion } from "framer-motion";

export default function LanyardLoader() {
  return (
    <div className="relative h-[400px] w-full sm:h-[480px] lg:h-[540px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <div className="h-32 w-24 rounded-lg border border-border bg-surface" />
          <div className="h-1 w-16 rounded-full bg-border" />
        </motion.div>
      </div>
    </div>
  );
}
