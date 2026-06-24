import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        // Accent "premium charbon" — change cette valeur pour reskinner tout le site.
        accent: {
          DEFAULT: "#1a1a1a",
          soft: "#44403c",
        },
      },
    },
  },
  plugins: [],
};

export default config;
