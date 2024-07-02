/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          800: "#1f2937",
        },
        pink: {
          400: "#f472b6",
          600: "#db2777",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark", "light"],
  },
};
