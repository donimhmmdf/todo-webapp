/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        primary: "#6C63FF",
      },
      screens: {
        "2xl": "1320px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
