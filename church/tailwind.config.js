/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#4C1D95',     // Deep Royal Purple
        accent: '#F59E0B',      // Luxurious Gold
        coral: '#FF6B6B',       // Vibrant Coral
        light: '#FAF7F0',       // Warm Cream Background
      },
      animation: {
        'float': 'float 7s ease-in-out infinite',
        'glow': 'glow 2.5s ease-in-out infinite alternate',
        'fadeInUp': 'fadeInUp 0.9s ease forwards',
        'scaleIn': 'scaleIn 0.7s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-30px)' },
        },
        glow: {
          'from': { textShadow: '0 0 15px #F59E0B, 0 0 30px #FF6B6B' },
          'to': { textShadow: '0 0 30px #F59E0B, 0 0 50px #FF6B6B' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(80px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          'from': { opacity: '0', transform: 'scale(0.8)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
      }
    },
  },
  plugins: [],
}