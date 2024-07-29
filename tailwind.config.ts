import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".glow-border-dark": {
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-2px",
              left: 0,
              right: 0,
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, rgb(82 82 82) 30%, rgb(163 163 163) 50%, rgb(82 82 82) 70%, transparent 100%)",
              filter: "blur(1px)",
            },
          },
          ".glow-border-light": {
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-2px",
              left: 0,
              right: 0,
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, rgb(229 229 229) 30%, rgb(170 170 170) 50%, rgb(229 229 229) 70%, transparent 100%)",
              filter: "blur(1px)",
            },
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
  darkMode: "class",
};

export default config;
