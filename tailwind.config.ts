import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'ui-serif', 'serif'],
      },
      keyframes: {
        popUp: {
          '0%': {
            opacity: '0', transform: 'translateY(15px) scale(0.97)'
          }, 
          '100%': {
            opacity: '1', transform: 'translateY(0) scale(1)'
          }
        },
        fadeInUp: {
          '0%': {
            opacity: '0', transform: 'translateY(15px)'
          },
          '100%': {
            opacity: '1', transform: 'translateY(0)'
          }
        }
      },
      animation: {
        popUp: 'popUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        fadeInUp: 'fadeInUp 0.3s ease-out forwards',
      }
    },
  },
  plugins: [],
} satisfies Config
