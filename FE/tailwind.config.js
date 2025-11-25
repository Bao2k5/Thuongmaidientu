
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        luxury: {
          // PRIMARY SYSTEM - CHAMPAGNE & ROSE GOLD THEME
          silverPearl: '#FAF7F2',      // Main BG (Champagne)
          silverPearlLight: '#FFFFFF', // Lighter BG (Pure White)
          silverPearlDark: '#F5F0EB',  // Darker BG (Warm Champagne)

          // SECONDARY SYSTEM
          platinumGrey: '#E8DDD3',     // Borders (Beige)
          platinumLight: '#F0E6DC',    // Light border
          steelGrey: '#B76E79',        // Medium accent (Rose Gold)
          steelDark: '#A05D6B',        // Darker accent (Deep Rose)

          // ACCENT SYSTEM
          deepBlack: '#4A4A4A',        // Primary Text (Charcoal Grey)
          softBlack: '#6B6B6B',        // Secondary Text (Soft Grey)
          metallicSilver: '#D4C4BA',   // Light accent (Champagne Beige)

          // LEGACY COMPATIBILITY (mapped to new palette)
          ivory: '#FAF7F2',            // → silverPearl
          white: '#FAF7F2',            // → silverPearl
          mint: '#F5F0EB',             // → silverPearlDark
          sage: '#D4C4BA',             // → metallicSilver
          softGreen: '#F0E6DC',        // → platinumLight
          beige: '#E8DDD3',            // → platinumGrey
          taupe: '#B76E79',            // → steelGrey (Rose Gold)
          brown: '#A05D6B',            // → steelDark
          charcoal: '#6B6B6B',         // → softBlack
          black: '#4A4A4A',            // → deepBlack
        },

        accent: {
          // LUXURY ACCENTS (Champagne & Rose Gold Edition)
          silver: '#D4C4BA',           // Champagne Beige
          silverDark: '#E8DDD3',       // Light Beige
          platinum: '#B76E79',         // Rose Gold

          // FUNCTIONAL COLORS
          primary: '#4A4A4A',          // Primary action (Charcoal)
          secondary: '#A05D6B',        // Secondary action (Deep Rose)
          success: '#7FA87F',          // Success (Sage Green)
          warning: '#E8A87C',          // Warning (Peach)
          error: '#C85A6E',            // Error (Rose Red)

          // LEGACY COMPATIBILITY
          gold: '#B76E79',             // Gold → Rose Gold
          rose: '#D4C4BA',             // Rose → Champagne Beige
          peach: '#F5F0EB',            // Peach → Warm Champagne
          mintLight: '#FFFFFF',        // Mint → Pure White
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
      boxShadow: {
        // LUXURY SILVER SHADOW SYSTEM
        'silver-sm': '0 1px 2px rgba(26, 26, 26, 0.04)',
        'silver-md': '0 4px 6px rgba(26, 26, 26, 0.08)',
        'silver-lg': '0 10px 15px rgba(26, 26, 26, 0.12)',
        'silver-xl': '0 20px 25px rgba(26, 26, 26, 0.16)',
        'silver-2xl': '0 25px 50px rgba(26, 26, 26, 0.20)',

        // LEGACY COMPATIBILITY
        'sm': '0 1px 2px rgba(26, 26, 26, 0.04)',
        'md': '0 4px 6px rgba(26, 26, 26, 0.08)',
        'lg': '0 10px 15px rgba(26, 26, 26, 0.12)',
        'xl': '0 20px 25px rgba(26, 26, 26, 0.16)',
      },
      backgroundImage: {
        // LUXURY SILVER GRADIENTS
        'silver-gradient': 'linear-gradient(135deg, #F7F8FA 0%, #E8E9EB 100%)',
        'silver-gradient-reverse': 'linear-gradient(135deg, #E8E9EB 0%, #F7F8FA 100%)',
        'platinum-gradient': 'linear-gradient(135deg, #C8CCD0 0%, #D4D8DC 100%)',
        'black-gradient': 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
        'steel-gradient': 'linear-gradient(135deg, #8D9297 0%, #6C7177 100%)',
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
