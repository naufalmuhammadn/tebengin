/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./screens/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins-Regular', 'Poppins-Bold']
      },
      colors: {
        'primary': '#5B1F15'
      }
    }
  },

  plugins: [],
}

