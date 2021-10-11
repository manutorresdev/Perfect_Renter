module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        custom: '100px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
