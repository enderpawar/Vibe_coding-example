import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#f9fafb', // gray-50
          dark: '#111827',  // gray-900
        },
        surface: {
          light: '#ffffff', // white
          dark: '#1f2937',  // gray-800
        },
        text: {
          light: '#111827', // gray-900
          dark: '#f9fafb',  // gray-50
        }
      },
      borderRadius: {
        '3xl': '32px',
      },
      boxShadow: {
        'soft': '0 8px 30px rgb(0,0,0,0.04)',
        'soft-dark': '0 8px 30px rgb(0,0,0,0.2)',
      }
    },
  },
  plugins: [],
} satisfies Config

