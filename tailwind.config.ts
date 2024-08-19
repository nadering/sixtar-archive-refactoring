import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["'IBM Plex Sans KR'", "'IBM Plex Sans JP'", "sans-serif"],
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "black": "#000000",
        "white": "#FFFFFF",
        "gray": {
          DEFAULT: "#b4b4b4",
          50: "#f7f7f7",
          100: "#ededed",
          200: "#dfdfdf",
          300: "#c8c8c8",
          400: "#b4b4b4",
          500: "#999999",
          600: "#888888",
          700: "#7b7b7b",
          800: "#676767",
          900: "#545454",
          950: "#363636",
        },
        // Primary & Secondary Colors
        "solar": {
          DEFAULT: "#fe7a9f",
          50: "#fff1f4",
          100: "#ffe3ea",
          200: "#ffccd9",
          300: "#ffa2bb",
          400: "#fe7a9f",
          500: "#f83b75",
          600: "#e51962",
          700: "#c20e52",
          800: "#a20f4c",
          900: "#8a1146",
          950: "#4d0422",
        },
        "lunar": {
          DEFAULT: "#3f4080",
          50: "#f3f5fb",
          100: "#e4e7f5",
          200: "#cfd6ee",
          300: "#aebce2",
          400: "#8899d2",
          500: "#6c7bc5",
          600: "#5861b8",
          700: "#4e52a7",
          800: "#3f4080",
          900: "#3a3c6e",
          950: "#272844",
        },
        // DLC Colors
        "flower-and-destiny": "#bf0048",
        "luminous-and-darkness": "#c9c8dde",
        "touhou-project-pack-1": "#f5c0ef",
        "pocotone": "#ff3985",
        "yomoha-planet": "#eea2a7",
        "wacca": "fed000",
        "oshiribeat": "#78ce04",
        "dystopia": "#307ef3",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
  ],
};
export default config;
