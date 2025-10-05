/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#11a4d4',
        'background-light': '#f6f8f8',
        'background-dark': '#101d22',
        'foreground-light': '#0d181b',
        'foreground-dark': '#f0f6f8',
        'subtle-light': '#e7f0f3',
        'subtle-dark': '#1a2c32',
        'muted-light': '#4c869a',
        'muted-dark': '#94b0b9',
      },
      fontFamily: {
        'display': ['Public Sans', 'sans-serif'],
      },
      borderRadius: {
        'DEFAULT': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        'full': '9999px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
