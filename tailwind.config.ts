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
          ash: "#06131d",
          black: "#020711",
          carbon: "#0a1f2c",
          red: "#ff2a1f",
          green: "#11f0ff",
          cyan: "#00d8ff",
          gold: "#ffd34d",
          steel: "#b8d7e8",
        },
        cyber: {
          red: "#ff2a1f",
          cyan: "#00e6ff",
          amber: "#ffb000",
          steel: "#d8efff",
          black: "#030405",
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
