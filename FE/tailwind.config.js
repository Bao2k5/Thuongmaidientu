/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pure Luxury Color Palette - All White Theme inspired by Mộc Miên
        luxury: {
          white: '#FFFFFF',
          black: '#000000',
          charcoal: '#1a1a1a',
          darkGray: '#333333',
          gray: '#666666',
          lightGray: '#999999',
          silver: '#cccccc',
          platinum: '#e5e5e5',
          pearl: '#f5f5f5',
          ivory: '#fafafa',
        },
        // Subtle accent colors (rarely used, for special highlights)
        accent: {
          gold: '#d4af37',
          rose: '#e6b8af',
          sage: '#b8c5b8',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        display: ['Cormorant Garamond', 'serif'], // For logo & elegant headings
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
