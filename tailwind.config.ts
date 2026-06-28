import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#030712",
        navy: "#07111f",
        cyanGlow: "#22d3ee",
        emeraldGlow: "#34d399",
        indigoGlow: "#818cf8",
      },
      boxShadow: {
        glow: "0 0 60px rgba(34, 211, 238, 0.18)",
        emerald: "0 0 50px rgba(52, 211, 153, 0.16)",
      },
      backgroundImage: {
        "radial-cyan": "radial-gradient(circle at 50% 0%, rgba(34,211,238,0.18), transparent 32rem)",
        "radial-emerald": "radial-gradient(circle at 80% 20%, rgba(52,211,153,0.16), transparent 28rem)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
