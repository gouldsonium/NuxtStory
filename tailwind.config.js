/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['storyblok/**/*.{vue,js}', 'components/**/*.{vue,js}', 'pages/**/*.vue'],
    theme: {
      extend: {
        colors: {
          primary: '#222831',
          secondary: '#ffa500'
        }
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
    ],
}
  
  