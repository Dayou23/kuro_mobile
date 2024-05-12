/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#008081",
        secondary: {
          DEFAULT: "#F8B333",
          100: "#F8B333",
          200: "#FF8E01",
        },
      },
    },
  },
  plugins: [],
};
