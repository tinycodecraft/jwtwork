/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx,html,css}'],
  variants: {
    borderColor: ['resonsive', 'hover', 'focus', 'focus-within'],
  },
  theme: {
    extend: {
      styles: {
        base: {
          drawer: {
            position: 'fixed',
            zIndex: 'z-[9999]',
            pointerEvents: 'pointer-events-auto',
            backgroundColor: 'bg-white',
            boxSizing: 'box-border',
            width: 'w-full',
            boxShadow: 'shadow-2xl shadow-blue-gray-900/10',
          },
          overlay: {
            position: 'absolute',
            inset: 'inset-0',
            width: 'w-full',
            height: 'h-full',
            pointerEvents: 'pointer-events-auto',
            zIndex: 'z-[9995]',
            backgroundColor: 'bg-black',
            backgroundOpacity: 'bg-opacity-60',
            backdropBlur: 'backdrop-blur-sm',
          },
        },
      },
      transformOrigin: {
        0: '0%',
      },
      zIndex: {
        '-1': '-1',
      },

      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        robo: ['Roboto', 'sans-serif'],
        vibe: ['Great Vibes', 'cursive'],
        monr: ['Montserrat'],
        fira: ['Fira Code', 'New Times Roman'],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1496px',
        '3xl': '1600px',
      },
      drawer: {
        defaultProps: {
          size: 300,
          overlay: true,
          placement: 'left',
          overlayProps: undefined,
          className: '',
          dismiss: {
            enabled: true,
            escapeKey: true,
          },
          onClose: undefined,
          transition: {
            type: 'tween',
            duration: 0.3,
          },
        },
      },
    },
    plugins: [],
  },
})
