"use client";

import { IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark"
          ? "Aktifkan light mode"
          : "Aktifkan dark mode"
      }
      title={theme === "dark" ? "Light Mode" : "Dark Mode"}
      className="
        flex h-11 w-11 shrink-0 items-center
        justify-center rounded-full

        border border-border
        bg-surface
        text-accent

        transition-all duration-300

        hover:border-accent
        hover:bg-accent-soft
        hover:shadow-[0_0_20px_var(--accent-glow)]

        active:scale-95
      "
    >
      {theme === "dark" ? (
        <IoSunny size={18} />
      ) : (
        <IoMoon size={18} />
      )}
    </button>
  );
}
