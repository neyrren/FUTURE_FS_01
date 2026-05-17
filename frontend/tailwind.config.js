/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        neon: '#00f5d4',
        ink:  '#030712',
      },
      keyframes: {
        gradientShift: { '0%,100%': { backgroundPosition:'0% 50%' }, '50%': { backgroundPosition:'100% 50%' } },
        float:   { '0%,100%': { transform:'translateY(0)' }, '50%': { transform:'translateY(-18px)' } },
        scan:    { '0%': { transform:'translateY(-100vh)' }, '100%': { transform:'translateY(100vh)' } },
        blink:   { '0%,100%': { opacity:'1' }, '50%': { opacity:'0' } },
      },
      animation: {
        gradient:  'gradientShift 6s ease infinite',
        float:     'float 6s ease-in-out infinite',
        scan:      'scan 6s linear infinite',
        blink:     'blink 1.1s step-end infinite',
      },
    },
  },
  plugins: [],
}
