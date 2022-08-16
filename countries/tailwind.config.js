/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily:{
        nunitoSans:['Nunito Sans', 'sans-serif'],
      },
      colors: {
        darkblue:'hsl(209, 23%, 22%)',
        verydarkblue: 'hsl(207, 26%, 17%)',
        verydarkbluetxt:'hsl(200, 15%, 8%)',
        darkgrey:'hsl(0, 0%, 52%)',
        verylightgrey:'hsl(0, 0%, 98%)',
        white:'hsl(0, 0%, 100%)',

    },
  },
  plugins: [require('flowbite/plugin')],
}}


