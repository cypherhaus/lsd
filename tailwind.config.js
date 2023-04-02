/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        pawBackground: "url(../media/paw.svg)",
      },
      flexBasis: {
        "11-perc": "11%",
        "9-perc": "9%",
      },
    },
    colors: {
      orange: "#ed5520",
      primary: "#000",
      brandLavendar: "#D9C5F6",
      brandGreen: "#14353F",
      brandWhite: "#EFEFEF",
      white: "#fff",
      cypherhausGreen: "#2C4745",
      black: "#000",
    },
    fontFamily: {
      sans: "Rubik, sans-serif",
      button: "Inter, sans-serif",
    },
  },
  plugins: [],
};
