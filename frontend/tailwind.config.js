module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        'principal-1': 'rgba(237,203,84,1)',
      },
      height: {
        custom: '100px',
      },
      backgroundColor: {
        'gray-Primary': 'rgba(49, 47, 47, 0.84)',
        'button-color': 'rgba(237,203,84,1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
