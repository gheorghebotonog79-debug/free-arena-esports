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
        freeArena: {
          cyan: "#00E5FF",
          red: "#FF1744",
          orange: "#FF6D00",
          background: "#050505",
          surface: "#090909",
          panel: "#0F1115",
        },
        arena: {
          ash: "#0F1115",
          black: "#050505",
          carbon: "#090909",
          red: "#FF1744",
          green: "#00E5FF",
          cyan: "#00E5FF",
          gold: "#FF6D00",
          steel: "#b8d7e8",
        },
        cyber: {
          red: "#FF1744",
          cyan: "#00E5FF",
          amber: "#FF6D00",
          steel: "#d8efff",
          black: "#050509",
          panel: "#0F1115",
        },
      },
      boxShadow: {
        panel: "0 18px 60px rgba(0, 0, 0, 0.36)",
        pulse: "0 0 0 1px rgba(17, 240, 255, 0.18), 0 20px 80px rgba(0, 216, 255, 0.08)",
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
