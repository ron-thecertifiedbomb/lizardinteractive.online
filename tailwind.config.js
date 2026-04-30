/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  // ─── Content ────────────────────────────────────────────────────────────────
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],

  // ─── Theme ──────────────────────────────────────────────────────────────────
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'micro': '6px',
        'tiny': '7px',
        'xxs': '8px',
        'xs-minus': '9px',
        'xs-plus': '10px',
        'sm-minus': '11px',
      },
      colors: {
        theme: {
          text: "var(--text)",
          muted: "var(--muted)",
          panel: "var(--panel)",
          "panel-2": "var(--panel-2)",
          accent: "var(--accent)",
        },
        dark: {
          900: '#080808',
          950: '#050505',
        }
      },
      // ─── Custom Gradients ───────────────────────────────────────────────────
      backgroundImage: {
        // Example: Extracts `bg-gradient-to-r from-emerald-950/30 to-transparent`
        'gradient-emerald-fade': 'linear-gradient(to right, rgb(2 44 34 / 0.3), transparent)',
        
        // Example: Extracts `bg-gradient-to-r from-emerald-950/30 to-zinc-950`
        'gradient-emerald-dark': 'linear-gradient(to right, rgb(2 44 34 / 0.3), rgb(9 9 11))',
        
        // Example: Extracts `bg-gradient-to-r from-blue-950/20 to-zinc-950`
        'gradient-blue-dark': 'linear-gradient(to right, rgb(23 37 84 / 0.2), rgb(9 9 11))',

        // Example: Extracts `bg-gradient-to-r from-red-900/80 to-red-950`
        'gradient-red-dark': 'linear-gradient(to right, rgb(127 29 29 / 0.8), rgb(69 10 10))',
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
