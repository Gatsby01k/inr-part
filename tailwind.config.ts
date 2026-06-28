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
        brand: "#2563EB", // primary blue
        brandDeep: "#1D4ED8", // deep blue
        canvas: "#F5F8FF", // page background
        canvas2: "#EEF4FF", // alt background
      },
      boxShadow: {
        glass: "0 12px 36px rgba(15, 23, 42, 0.06)",
        glassSoft: "0 6px 22px rgba(15, 23, 42, 0.05)",
        lift: "0 16px 36px rgba(37, 99, 235, 0.12)",
        btn: "0 8px 18px rgba(37, 99, 235, 0.22)",
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
