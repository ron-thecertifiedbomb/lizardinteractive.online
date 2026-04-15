/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Change this from #1d4ed8 to #000000 to kill the blue
        "dark-bg": "#000000",
        "light-gray": "#f8fafc",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        serif: ["Merriweather", "ui-serif", "Georgia"],
        mono: ["Fira Code", "ui-monospace", "SFMono-Regular"],
      },
      keyframes: {
        slideX: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(6px)" },
        },
        slideCarousel: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(10px)" },
        },
        slideDownIn: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-x": "slideX 2s ease-in-out infinite",
        "slide-carousel": "slideCarousel 3s ease-in-out infinite",
        "slide-down-in": "slideDownIn 1s ease-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
