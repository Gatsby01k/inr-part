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
        glass: "0 20px 70px rgba(37, 99, 235, 0.10)",
        glassSoft: "0 10px 40px rgba(37, 99, 235, 0.08)",
        lift: "0 24px 60px rgba(37, 99, 235, 0.16)",
        btn: "0 10px 24px rgba(37, 99, 235, 0.28)",
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
