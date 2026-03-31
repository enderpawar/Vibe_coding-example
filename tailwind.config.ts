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
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'ui-serif', 'serif'],
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
        },
        reveal: {
          '0%': {
            opacity: '0',
            transform: 'translateY(24px) scale(0.98)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        drift: {
          '0%, 100%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '50%': {
            transform: 'translate3d(0, -10px, 0)',
          },
        },
        sheen: {
          '0%': {
            transform: 'translateX(-130%)',
            opacity: '0',
          },
          '20%': {
            opacity: '0.08',
          },
          '50%': {
            opacity: '0.18',
          },
          '100%': {
            transform: 'translateX(130%)',
            opacity: '0',
          },
        },
        pulseLine: {
          '0%, 100%': {
            opacity: '0.25',
            transform: 'scaleX(0.9)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scaleX(1)',
          },
        },
      },
      animation: {
        popUp: 'popUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        fadeInUp: 'fadeInUp 0.3s ease-out forwards',
        reveal: 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        drift: 'drift 7s ease-in-out infinite',
        sheen: 'sheen 2.8s ease-in-out infinite',
        pulseLine: 'pulseLine 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
} satisfies Config
