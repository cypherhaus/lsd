/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:
         {
           'paw_background': "url(../media/paw.svg)"
         }
    },
    colors: {
      'brandOrange': '#ED5520',
      'brandLavendar': '#D9C5F6',
      'brandGreen': '#14353F',
      'brandWhite': '#EDECDF',
      'white': '#fff',
    },
    fontFamily: {
      'sans': 'Rubik, sans-serif',
      'button': 'Inter, sans-serif'
    }
  },
  plugins: [],
};
