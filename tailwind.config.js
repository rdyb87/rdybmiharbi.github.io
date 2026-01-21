/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        // Match fathurdev.uk exact colors
        background: '#fffdf5',
        foreground: '#1e293b',
        muted: '#f1f5f9',
        mutedForeground: '#64748b',
        accent: '#8b5cf6',
        secondary: '#f472b6',
        tertiary: '#fbbf24',
        quaternary: '#34d399',
        'border-dark': '#1e293b',

        // Keep brand aliases for backward compatibility if needed, but updated to match
        brandBg: '#fffdf5',
        brandDark: '#1e293b',
        brandPink: '#f472b6',
        brandPurple: '#8b5cf6',
        brandYellow: '#fbbf24',
        brandGreen: '#34d399',
        brandBlue: '#3B82F6',
      },
      fontFamily: {
        heading: ['"Outfit"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px #1e293b',
        'hard-hover': '6px 6px 0px 0px #1e293b',
        'hard-active': '2px 2px 0px 0px #1e293b',
        'neo': '4px 4px 0px 0px #1e293b',
        'neo-lg': '8px 8px 0px 0px #1e293b',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#1e293b',
            a: {
              color: '#8b5cf6',
              '&:hover': {
                color: '#7c3aed',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
}
