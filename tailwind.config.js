/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#e0d7e8",
          200: "#c2b0d1",
          300: "#a388bb",
          400: "#8561a4",
          500: "#66398d",
          600: "#522e71",
          700: "#3d2255",
          800: "#291738",
          900: "#140b1c",
        },
        secondary: {
          100: "#dbf1f2",
          200: "#b7e3e4",
          300: "#93d6d7",
          400: "#6fc8c9",
          500: "#4bbabc",
          600: "#3c9596",
          700: "#2d7071",
          800: "#1e4a4b",
          900: "#0f2526",
        },
      },
    },
  },
  plugins: [],
};
