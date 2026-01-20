/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'; // Add this at the top

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        // The exact cream background from the screenshot
        brandBg: '#FFFDF0', 
        // High-contrast dark for text and borders
        brandDark: '#1A202C',
        // Accent colors matching the grid boxes
        brandPink: '#FF71BD',
        brandPurple: '#8B5CF6',
        brandYellow: '#FFB800',
        brandGreen: '#10B981',
        brandBlue: '#3B82F6',
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        // Geometric sans-serif used for the bold headings
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        // Replicates the solid black offset shadow on buttons and the profile frame
        'neo': '4px 4px 0px 0px #1A202C',
        'neo-lg': '8px 8px 0px 0px #1A202C',
      },
      // Keeps your existing typography configuration
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#334155',
            a: {
              color: '#0ea5e9',
              '&:hover': {
                color: '#0284c7',
              },
            },
            code: {
              backgroundColor: '#f1f5f9',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}