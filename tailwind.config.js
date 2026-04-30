/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  // ─── Content ────────────────────────────────────────────────────────────────
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  // ─── Theme ──────────────────────────────────────────────────────────────────
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
        200: "200",
      },
    },
  },

  // ─── Plugins ────────────────────────────────────────────────────────────────
  plugins: [require("@tailwindcss/typography")],
};
