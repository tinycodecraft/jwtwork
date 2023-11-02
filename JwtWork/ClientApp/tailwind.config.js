/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        robo: ["Roboto", "sans-serif"],
        vibe: ["Great Vibes", "cursive"],
        monr: ["Montserrat"],
        fira: ["Fira Code", "New Times Roman"] 
      },
      container: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1496px',
        }
      }

    },
  },
  plugins: [],
});


