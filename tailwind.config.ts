import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EC407A",
        "primary-dark": "#D81B60",
        "primary-light": "#FF4FA3",
        green: {
          momo: "#8BC34A",
          light: "#9CCC65",
          lighter: "#AED581",
          dark: "#7CB342",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      maxWidth: {
        mobile: "390px",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "15%, 45%, 75%": { transform: "translateX(-5px)" },
          "30%, 60%, 90%": { transform: "translateX(5px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        shake: "shake 0.45s ease-in-out",
        fadeIn: "fadeIn 0.2s ease-out",
        slideUp: "slideUp 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
