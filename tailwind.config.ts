import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Surfaces — deep navy / graphite / near-black
        ink: "#070b12",
        panel: "#0b1120",
        slatecard: "#0e1525",
        line: "#1b2638",
        // Primary accent — emerald / teal
        brand: "#10b981",
        brandSoft: "#34d399",
        teal: "#14b8a6",
        // Secondary accent — electric blue
        electric: "#3b82f6",
        electricSoft: "#60a5fa",
        // Review / reserve notices — soft amber
        amberSoft: "#fbbf24",
      },
      boxShadow: {
        glow: "0 0 50px rgba(16, 185, 129, 0.16)",
        electric: "0 0 50px rgba(59, 130, 246, 0.14)",
        card: "0 24px 70px rgba(2, 6, 15, 0.55)",
      },
      backgroundImage: {
        "radial-emerald": "radial-gradient(circle at 25% 0%, rgba(16,185,129,0.12), transparent 34rem)",
        "radial-electric": "radial-gradient(circle at 85% 12%, rgba(59,130,246,0.10), transparent 30rem)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
