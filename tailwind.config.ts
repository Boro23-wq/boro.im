import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/theme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/accordion.js",
  ],
  theme: {
    extend: {
      keyframes: {
        enter: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "none" },
        },
        "border-spin": {
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
        "bounce-x": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-10px)" },
        },
        "left-translate": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-8px)" },
        },
      },
      animation: {
        "bounce-x": "bounce-x 1s ease-in-out infinite",
        "left-translate": "left-translate 0.5s forwards",
        "border-spin": "border-spin 7s linear infinite",
        enter: "enter 0.6s both",
      },
    },
  },
  plugins: [nextui()],
  darkMode: "class",
};

export default config;
