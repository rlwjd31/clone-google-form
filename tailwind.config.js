/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-primary": "#673AB7",
        "purple-secondary": "#F0EBF8",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

// "primary": "#3C64B1",
// "secondary": "#F2F2F2",
// "tertiary": "#F8F8F8",
// "quaternary": "#E5E5E5",
// "quinary": "#D8D8D8",
// "senary": "#BFBFBF",
// "septenary": "#A6A6A6",
// "octonary": "#8C8C8C",
// "nonary": "#737373",
// "denary": "#595959",
// "elevenary": "#404040",
// "twelvary": "#262626",
// "thirteenary": "#0D0D0D",
