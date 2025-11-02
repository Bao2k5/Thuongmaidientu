/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mộc Miên Jewelry - Cream Milk Tea Palette (Kem Sữa Bò) - NHẠT HƠN
        luxury: {
          cream: '#F8F5F2',      // Kem rất nhạt (nền chính) - lightened from #F5F1ED
          ivory: '#FCFAF8',      // Ivory rất nhạt (nền phụ) - lightened from #FAF7F2
          sand: '#EDE6DC',       // Cát nhạt hơn - lightened from #E8DFD3
          beige: '#E2D8CC',      // Be nhạt hơn - lightened from #D9CCBE
          taupe: '#B8A890',      // Taupe nhạt hơn (text nhạt) - lightened from #A89678
          brown: '#6B5845',      // Nâu nhạt hơn (text chính) - lightened from #5C4033
          charcoal: '#3D3728',   // Charcoal nhạt hơn (headings) - lightened from #2C2415
          white: '#FFFFFF',      // Trắng tinh
          black: '#1A1A1A',      // Đen (chỉ dùng khi cần)
        },
        // Accent colors (tối giản)
        accent: {
          silver: '#C0C0C0',     // Bạc 925
          gold: '#D4AF37',       // Vàng (hiếm)
          rose: '#E8CCBC',       // Hồng nhạt
          softPeach: '#F5E6D3',  // Mới: Đào nhạt - hợp với kem sữa (cho Product section)
          lightRose: '#F0DFD2',  // Mới: Hồng nhạt - thay thế hồng cũ
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
