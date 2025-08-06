// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // padrão para textos
        heading: ['"Inter"', 'sans-serif'], // você pode criar variantes
      },
      colors: {
        white: '#F8FCFC',
        richBlack: '#021011',
        richBlackOne: '#232323ff',
        richBlackTwo: '#3a3a3aff',
        emerald: '#00DF82',
        darkSlateGray: '#35574F',
        darkGreen: '#042321',
        mint: '#3EB594',
        brunswickGreen: '#0A4438',
        antiflashWhite: '#EFF6F6',
        viridian: '#148269',
        hookersGreen: '#677F7C',
      },
    },
  },
  plugins: [],
}
