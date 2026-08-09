import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        driver: {
          dark: "#f8fafc",
          card: "#ffffff",
          border: "#e2e8f0",
          accent: "#0284c7",
          warning: "#d97706",
          danger: "#dc2626",
          success: "#16a34a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
