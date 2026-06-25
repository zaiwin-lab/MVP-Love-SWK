import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sarawak-red': '#cc0000',
        'sarawak-gold': '#ffd700',
        'sarawak-dark': '#0a0a0f',
        cream: '#f5f0e8',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'heart-glow': 'heartGlow 2s ease-in-out infinite',
        'float': 'floatHeart 3s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'star-twinkle': 'starTwinkle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
