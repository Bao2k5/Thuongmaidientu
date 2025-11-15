
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        luxury: {
          // PRIMARY SYSTEM - 60%
          silverPearl: '#F7F8FA',      // Primary background - bright, soft, premium
          silverPearlLight: '#FAFBFC', // Lighter version
          silverPearlDark: '#F0F2F5',  // Darker version
          
          // SECONDARY SYSTEM - 30%
          platinumGrey: '#C8CCD0',     // Main secondary - platinum
          platinumLight: '#D4D8DC',    // Light platinum
          steelGrey: '#8D9297',        // Steel grey - medium
          steelDark: '#6C7177',        // Dark steel
          
          // ACCENT SYSTEM - 10%
          deepBlack: '#1A1A1A',        // Primary accent
          softBlack: '#2D2D2D',        // Soft black
          metallicSilver: '#E8E9EB',   // Metallic silver
          
          // LEGACY COMPATIBILITY (mapped to new palette)
          ivory: '#F7F8FA',            // → silverPearl
          white: '#F7F8FA',            // → silverPearl
          mint: '#F0F2F5',             // → silverPearlDark
          sage: '#E8E9EB',             // → metallicSilver
          softGreen: '#D4D8DC',        // → platinumLight
          beige: '#C8CCD0',            // → platinumGrey
          taupe: '#8D9297',            // → steelGrey
          brown: '#6C7177',            // → steelDark
          charcoal: '#2D2D2D',         // → softBlack
          black: '#1A1A1A',            // → deepBlack
        },

        accent: {
          // LUXURY SILVER ACCENTS
          silver: '#E8E9EB',           // Metallic silver
          silverDark: '#C8CCD0',       // Dark silver
          platinum: '#B8BCC0',         // Platinum accent
          
          // FUNCTIONAL COLORS
          primary: '#1A1A1A',          // Primary action (deep black)
          secondary: '#6C7177',        // Secondary action (steel dark)
          success: '#4A5568',          // Success (dark grey)
          warning: '#8D9297',          // Warning (steel grey)
          error: '#6C7177',            // Error (steel dark)
          
          // LEGACY COMPATIBILITY
          gold: '#D4AF37',             // Keep gold for special occasions
          rose: '#E8E9EB',             // → silver
          peach: '#F0F2F5',            // → silverPearlDark
          mintLight: '#FAFBFC',        // → silverPearlLight
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
