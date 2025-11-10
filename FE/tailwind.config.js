/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mộc Miên Inspired - Pastel Mint & Sage Palette
        luxury: {
          cream: '#F9F7F4',      // Warm cream (nền chính)
          ivory: '#FCFBF9',      // Ivory nhạt (cards, sections)
          mint: '#E8F3F0',       // Mint pastel (hero, featured sections) - Mộc Miên style
          sage: '#D4E4DF',       // Sage green (accents, borders)
          softGreen: '#C8DED6',  // Soft green (hover states)
          sand: '#EBE6E0',       // Warm sand
          beige: '#DED5CA',      // Beige neutral
          taupe: '#A89B8F',      // Taupe (subtle text)
          brown: '#6B5D52',      // Warm brown (text)
          charcoal: '#3D3530',   // Charcoal (headings)
          white: '#FFFFFF',      // Pure white
          black: '#1C1C1C',      // Deep black
        },
        // Accent colors
        accent: {
          silver: '#BFC4C8',     // Silver 925
          gold: '#D4AF37',       // Gold accent
          rose: '#E8D5D0',       // Soft rose
          peach: '#F2E8DE',      // Warm peach
          mintLight: '#F0F8F6',  // Very light mint for subtle backgrounds
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Montserrat', 'sans-serif'], // Logo & headings - clean sans-serif
      },
      letterSpacing: {
        widest: '0.2em',
        'extra-wide': '0.15em',
        'wide': '0.05em',
      },
      borderWidth: {
        '1': '1px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
