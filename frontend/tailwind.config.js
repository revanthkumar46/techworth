/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        tech: {
          primary: "#2E4374",  // Dark blue - primary (30%)
          secondary: "#4B527E", // Medium blue - secondary
          accent: "#7C9D96", // Teal accent (10%)
          dark: "#0A2647", // Deep navy
        }
      },
      backgroundImage: {
        'gradient-tech': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }
    },
  },
  plugins: [],
}

