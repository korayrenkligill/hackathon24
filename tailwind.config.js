/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        error: "#FF8C8C",
        warn: "#FFCA5D",
        success: "#8CFFC0",
        info: "#89C2FF",
        neutral: "#C9C9C9",
        highlight: "#fa2b88",

        background: {
          light: "#f4f4f5", // Ana açık renk
          lightAlt1: "#e8e8ea", // Daha açık ton
          lightAlt2: "#dcdcdf", // En açık ton
          DEFAULT: "#f4f4f5", // Varsayılan
          dark: "#161618", // Ana koyu renk
          darkAlt1: "#18181b", // Daha açık ton
          darkAlt2: "#131316", // En açık ton
          darkAlt3: "#242426", // En açık ton
        },
        text: {
          light: "#27272a",
          DEFAULT: "#f4f4f5",
          dark: "#f4f4f5",
        },
        stext: {
          light: "#494950",
          DEFAULT: "#dfdfe2",
          dark: "#dfdfe2",
        },
        ttext: {
          light: "#5e5e68",
          DEFAULT: "#c9c9cf",
          dark: "#c9c9cf",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "Arial", "sans-serif"],
        serif: ["Literata", "Georgia", "serif"],
        outfit: ["Outfit", "serif"],
      },
      keyframes: {
        swipe: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        swipe: "swipe var(--speed) linear infinite backwards",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
