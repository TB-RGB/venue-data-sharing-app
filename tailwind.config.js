/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        foreground: "hsl(var(--foreground))"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('daisyui'),
  ],
    daisyui:{
      themes: ['sunset', 'lemonade', 'retro', 'dracula']
    }
}

