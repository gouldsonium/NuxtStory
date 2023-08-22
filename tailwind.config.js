require('dotenv').config()

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['storyblok/**/*.{vue,js}', 'components/**/*.{vue,js}', 'pages/**/*.vue'],
  theme: {
    extend: {
      colors: {
        primary: process.env.PRIMARY_COLOR,
        secondary: process.env.SECONDARY_COLOR
      },
      screens: {
        xs: '495px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
  
  