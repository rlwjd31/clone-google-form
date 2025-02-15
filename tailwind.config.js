/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-primary": "#673AB7",
        "purple-secondary": "#F0EBF8",
        card: "#FFFFFF",
        "blue-primary": "#4285f4",
        "red-primary": "#C23729",
      },
      backgroundImage: {
        "dot-pattern": "radial-gradient(circle, black 1px, transparent 1px)",
      },
      keyframes: {
        scaleUp: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        scaleDown: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
        fillFromBorder: {
          "0%": {
            background: "transparent",
            boxShadow: "inset 0 0 0 0 #673AB7",
          },
          "100%": {
            background: "#673AB7",
            boxShadow: "inset 0 0 0 100px #673AB7",
          },
        },
        emptyFromCenter: {
          "0%": {
            background: "#673AB7",
            boxShadow: "inset 0 0 0px 100px #673AB7",
          },
          "100%": {
            background: "transparent",
            boxShadow: "inset 0 0 0 0 rgb(0, 0, 0, 0)",
          },
        },
      },
      animation: {
        scaleUp: "scaleUp 0.2s ease-out none",
        scaleDown: "scaleDown 0.2s ease-out forwards",
        fillFromBorder: "fillFromBorder 0.5s ease-in forwards",
        emptyFromCenter: "emptyFromCenter 0.2s ease-in forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
