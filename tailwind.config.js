/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cypherhaus: ["Beyond"],
      },
      colors: {
        offWhite: "#efefef",
        dark200: "#666666",
        bolt: "#ffd400",
        orange: "#ed4208",
        cypherhaus: "#2c4745",
      },
      spacing: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};
