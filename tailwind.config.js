/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cypherhaus: ["Beyond"],
      },
      colors: {
        offWhite: "#d6d6d6",
        dark100: "a8a8a8",
        dark200: "#666666",
        dark300: "#3f3f3f",
        dark400: "#1C1C1C",
        bolt: "#ffd400",
      },
      spacing: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};
