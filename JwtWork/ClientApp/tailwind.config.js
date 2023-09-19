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
      }
    },
  },
  plugins: [],
});


