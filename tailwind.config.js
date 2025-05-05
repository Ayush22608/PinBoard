/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#eaefff',
          200: '#d5dfff',
          300: '#b4c6ff',
          400: '#8ba4ff',
          500: '#6681ff',
          600: '#3d56f6',
          700: '#2e42d3',
          800: '#2537ab',
          900: '#1f2d7f',
          950: '#141a4a',
        },
        secondary: {
          50: '#fffaeb',
          100: '#fff0c6',
          200: '#ffe187',
          300: '#ffcb47',
          400: '#ffb21d',
          500: '#ff9c06',
          600: '#e17e00',
          700: '#bb5b02',
          800: '#974708',
          900: '#7c3a0c',
          950: '#461c03',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f4f5f7',
          200: '#e5e7eb',
          300: '#d2d6dc',
          400: '#9fa6b2',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#252f3f',
          900: '#161e2e',
          950: '#0d1117',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
        'hover': '0 20px 30px -10px rgba(0, 0, 0, 0.08), 0 10px 15px -3px rgba(0, 0, 0, 0.02)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
