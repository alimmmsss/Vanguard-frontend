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
        // Uber-like Palette
        "midnight": "#000000",      // Pure Black
        "midnight-light": "#333333", // Dark Grey
        "champagne": "#FFFFFF",     // Remapped to White to maintain contrast in existing components temporarily
        "champagne-light": "#F6F6F6", // Light Grey
        "platinum": "#F6F6F6",      // Uber Light Grey
        "deep-slate-blue": "#000000", // Legacy: Map to Black
        "electric-teal": "#000000",   // Legacy: Map to Black (or keep a functional blue if needed, but going monochrome for now)
      },
      fontFamily: {
        // Removed serif, strictly sans
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      // Removed custom luxury animations for cleaner feel
    },
  },
  plugins: [],
};
export default config;
