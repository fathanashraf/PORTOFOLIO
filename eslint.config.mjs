import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  // ============================================================
  // Komponen vendor (React Bits / Three.js Lanyard) mengikuti
  // source resmi penyedianya. Pattern `ref.current = ...` saat
  // render + setState di effect adalah bagian dari implementasi
  // resmi mereka — biarkan apa adanya agar mudah di-update.
  // ============================================================
  {
    files: [
      "components/effects/**",
      "components/lanyard/**",
      "components/PillNav.tsx",
    ],
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },

  // ============================================================
  // ThemeProvider harus membaca tema tersimpan (localStorage)
  // dari dalam effect untuk menghindari hydration mismatch.
  // ============================================================
  {
    files: ["components/ThemeProvider.tsx"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
