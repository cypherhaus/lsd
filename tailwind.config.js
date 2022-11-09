/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        offWhite: "#d6d6d6",
        dark200: "#666666",
        dark300: "#3f3f3f",
        dark400: "#1C1C1C",
      },
      spacing: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};
