module.exports = {
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: ['w-4'],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'twitter-blue': {
          DEFAULT: '#1da1f2',
          hover: '#188acf',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
