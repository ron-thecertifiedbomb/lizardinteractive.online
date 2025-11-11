/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // make sure your CSS is inside src
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        iceland: ['"Iceland"', "sans-serif"], 
      },
     
    },
  },
  plugins: [require("tailwindcss-animate")],
};
