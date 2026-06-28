import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom flat tokens — chosen NOT to collide with Tailwind's default
        // color scales (blue / sky / emerald / amber / slate are used directly).
        ink: "#0F172A", // primary text
        muted: "#475569", // secondary text
        // Primary accent is now saffron (India-inspired). `brand` is kept as an
        // alias so existing *-brand utilities resolve to saffron everywhere.
        brand: "#F59E0B", // saffron primary
        brandDeep: "#D97706", // deeper saffron
        saffron: "#F59E0B",
        saffronWarm: "#FB923C",
        navy: "#1E293B", // deep navy structure
        navyInst: "#1E3A8A", // institutional navy
        canvas: "#FFFDF7", // warm ivory page background
        canvas2: "#F8FAFC", // soft neutral
      },
      boxShadow: {
        glass: "0 12px 36px rgba(15, 23, 42, 0.07)",
        glassSoft: "0 6px 22px rgba(15, 23, 42, 0.05)",
        lift: "0 16px 36px rgba(245, 158, 11, 0.16)",
        btn: "0 8px 18px rgba(245, 158, 11, 0.22)",
        btnSaffron: "0 16px 36px rgba(245, 158, 11, 0.26)",
      },
      backgroundImage: {
        "blue-sheen": "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
