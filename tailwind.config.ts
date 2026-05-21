import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arena: {
          ash: "#101010",
          black: "#050505",
          carbon: "#171717",
          red: "#e11d35",
          green: "#23d18b",
          cyan: "#38d5ff",
          gold: "#f7c948",
          steel: "#c7ced8",
        },
      },
      boxShadow: {
        panel: "0 18px 60px rgba(0, 0, 0, 0.36)",
        pulse: "0 0 0 1px rgba(35, 209, 139, 0.18), 0 20px 80px rgba(35, 209, 139, 0.08)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "Rajdhani",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "arena-grid":
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        "scan-lines":
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 6px)",
      },
    },
  },
  plugins: [],
};

export default config;
