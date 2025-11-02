/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mộc Miên Jewelry - Cream Milk Tea Palette (Kem Sữa Bò)
        luxury: {
          cream: '#F5F1ED',      // Kem nhạt (nền chính)
          ivory: '#FAF7F2',      // Tivory (nền phụ)
          sand: '#E8DFD3',       // Cát nhạt
          beige: '#D9CCBE',      // Be da người
          taupe: '#A89678',      // Taupe (text nhạt)
          brown: '#5C4033',      // Nâu (text chính)
          charcoal: '#2C2415',   // Charcoal tối (headings)
          white: '#FFFFFF',      // Trắng tinh
          black: '#1A1A1A',      // Đen (chỉ dùng khi cần)
        },
        // Accent colors (tối giản)
        accent: {
          silver: '#C0C0C0',     // Bạc 925
          gold: '#D4AF37',       // Vàng (hiếm)
          rose: '#E8CCBC',       // Hồng nhạt
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'Segoe UI', 'sans-serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Playfair Display', 'serif'], // Logo & elegant headings
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
