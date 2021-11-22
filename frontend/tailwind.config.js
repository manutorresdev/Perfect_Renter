module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    stroke: (theme) => ({
      black: theme('colors.black')
    }),
    extend: {
      screens: {
        xs: '540px'
      },
      minWidth: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        28: '6rem',
        32: '8rem',
        xs: '20rem',
        xxs: '10rem',
        xxs2: '8rem'
      },
      minHeight: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        32: '8rem',
        '10rem': '10rem',
        '15rem': '15rem',
        '20rem': '20rem',
        lg: '700px',
        '6/10': '60%'
      },
      maxHeight: {
        100: '28rem',
        xs: '20rem',
        lg: '40rem',
        xl: '80rem',
        full: '100%'
      },
      maxWidth: {
        custom: '16rem',
        xxs: '10rem',
        xxs2: '8rem',
        customXL: '1650px'
      },
      keyframes: {
        LeftX: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        RightX: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        fadeIn: {
          '0%': {
            opacity: 0
          },
          '100%': {
            opacity: 1
          }
        }
      },
      animation: {
        LeftX: 'LeftX 0.3s ease-in',
        RightX: 'RightX 0.3s ease-in',
        fadeIn: 'fadeIn 0.2s ease-in'
      },
      strokeWidth: {
        3: '3',
        4: '4',
        10: '10',
        20: '20'
      },

      gridTemplateColumns: {
        custom: 'repeat(2,minmax(0,350px))'
      },
      gridTemplateRows: {
        auto: 'auto',
        8: 'repeat(8, minmax(0, 1fr))'
      },
      gridTemplatesColumns: {
        1: 'repeat(2, minmax(0, 0.5fr))'
      },
      backgroundImage: {
        // 'fondo-gris':
        // "linear-gradient(rgba(16, 16, 16, 0.9),rgba(16, 16, 16, 0.3)),url('./Images/fondo-gris.jpeg')",
      },
      textColor: {
        'principal-1': 'rgba(237,203,84,1)',
        'principal-gris': 'rgba(49, 47, 47, 0.84)'
      },
      height: {
        'max-content': 'max-content',
        min: 'min-content',
        '60vh': '60vh',
        '30vh': '30vh',
        '90%': '90%',
        '95%': '95%',
        lg: '480px',
        custom: '100px'
      },
      backgroundColor: {
        'gray-Primary': 'rgba(49, 47, 47, 0.84)',
        'principal-1': 'rgba(237,203,84,1)',
        'principal-1-hover': 'rgba(237, 204, 84, 0.73)'
      },
      borderRadius: {
        circle: '50%'
      },
      boxShadow: {
        perfil: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
        custom:
          'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;'
      },
      outline: {
        contrast: ['1px solid #000000', '0px']
      },
      top: {
        '9,5': '2.35rem',
        '9,8': '2.38rem'
      }
    }
  },
  variants: {
    extend: {
      maxHeight: ['hover'],
      padding: ['hover', 'focus'],
      boxShadow: ['active'],
      outline: ['hover', 'active']
    }
  },
  plugins: []
}
