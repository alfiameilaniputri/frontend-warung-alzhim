module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#E8F8F0',
          100: '#D5F4E6',
          300: '#81E6BB',
          500: '#2ECC71',
          700: '#229954',
          900: '#145A32',
        },
        secondary: {
          50:  '#FEF5E7',
          100: '#FCE7C5',
          300: '#F8C471',
          500: '#F39C12',
          700: '#CA6F1E',
          900: '#7D4C0F',
        },
        accent: {
          50:  '#FADBD8',
          100: '#F5B7B1',
          300: '#EC7063',
          500: '#E74C3C',
          700: '#CB4335',
          900: '#922B21',
        },
        neutral: {
          50:  '#FFFEF9',
          100: '#F8F9F9',
          300: '#D5D8DC',
          500: '#95A5A6',
          700: '#5D6D76',
          900: '#2C3E50',
        },
        success: '#28A745',
        error:   '#DC3545',
        warning: '#FFC107',
        info:    '#17A2B8',
      },
    },
  },
  plugins: [],
};
