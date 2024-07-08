/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
    daisyui:{
      themes: ['sunset', 'lemonade', 'retro', 'dracula']
    }
}

