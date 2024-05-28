require('dotenv').config()

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: ['storyblok/**/*.{vue,js}', 'components/**/*.{vue,js}', 'pages/**/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        heading: [process.env.HEADING_FONT_FAMILY, 'serif'],
        text: [process.env.TEXT_FONT_FAMILY, 'sans-serif'],
      },
      colors: {
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
  
  