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
        // serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
        // mono:  ["Fira Code",    ...defaultTheme.fontFamily.mono],
      },
    },
  },

  // ─── Plugins ────────────────────────────────────────────────────────────────
  plugins: [require("@tailwindcss/typography")],
};
