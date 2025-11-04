import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f8ff',
          100: '#e0f0ff',
          200: '#b7d9ff',
          300: '#8fc3ff',
          400: '#58a2ff',
          500: '#2d83ff',
          600: '#1a66d9',
          700: '#0f4db3',
          800: '#08338c',
          900: '#041f66'
        }
      }
    }
  },
  plugins: []
};

export default config;
