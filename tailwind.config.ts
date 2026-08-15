// Lead Developer: Raghul
// Theme: Dark Cyber-Industrial

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. Custom Color Palette
      colors: {
        geco: {
          bg: "#0A0B0E",         // Deepest background for the 3D environments
          surface: "#14171D",    // Slightly lighter for cards and panels
          border: "#262B36",     // Metallic/Industrial borders
          yellow: "#FFC700",     // High-visibility accent color
        },
      },
      
      // 2. Custom Fonts (Matches the technical/industrial aesthetic)
      fontFamily: {
        // Assuming you set up standard sans and mono fonts in your root layout
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },

      // 3. Custom Keyframes & Animations
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;