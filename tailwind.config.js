/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      DEFAULT: "0.313rem",
    },
    extend: {
      screens: {
        tablet: "600px",
      },
      colors: {
        primary: "#0070f3",
        secondaryWhite: "#fafafa",
      },
    },
  },
  plugins: [],
};
