/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F5385D",
        error: "#d32f2f",
      },
      height: {
        30: "7.5rem",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
