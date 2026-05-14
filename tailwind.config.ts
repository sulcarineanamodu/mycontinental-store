import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a7a4a',
        'primary-light': '#2a9a5a',
        'primary-dark': '#0a5a2a',
        accent: '#C9972B',
        'accent-light': '#d9a73b',
        'accent-dark': '#b9871b',
        background: '#FFF8F0',
        'text-primary': '#1a1a2e',
        'text-secondary': '#555555',
        'border-light': '#e8e8e8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      spacing: {
        'safe-top': 'max(1.5rem, env(safe-area-inset-top))',
        'safe-bottom': 'max(1.5rem, env(safe-area-inset-bottom))',
        'safe-left': 'max(1.5rem, env(safe-area-inset-left))',
        'safe-right': 'max(1.5rem, env(safe-area-inset-right))',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
