import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand orange — primary accent (#F5921D)
        teal: {
          DEFAULT: '#F5921D',
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F5921D',
          600: '#F5921D',
          700: '#EA6C0A',
          800: '#C2570B',
          900: '#9A3412',
        },
        // Deep navy — text & dark sections
        navy: {
          DEFAULT: '#1B2E4A',
          50: '#F0F4F9',
          100: '#E1E9F3',
          200: '#C3D3E7',
          300: '#95AECE',
          400: '#6085B3',
          500: '#3D6399',
          600: '#2D4E7E',
          700: '#243F66',
          800: '#1B2E4A',
          900: '#1B2E4A',
        },
        // Warm amber — warnings / overpriced
        amber: {
          DEFAULT: '#F59E0B',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Soft background
        background: '#FFFFFF',
        surface: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-md': '0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
        'card-lg': '0 10px 30px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.04)',
        'teal-glow': '0 8px 20px rgba(245,146,29,0.25)',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideUp: 'slideUp 0.4s ease-out',
        fadeInUp: 'fadeInUp 0.6s ease-out both',
        'pulse-teal': 'pulse-teal 2s infinite',
        shimmer: 'shimmer 2s linear infinite',
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
        fadeInUp: {
          '0%': { transform: 'translateY(32px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-teal': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(245, 146, 29, 0.35)' },
          '50%': { boxShadow: '0 0 0 10px rgba(245, 146, 29, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
