module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#00334C',
        'medium-blue': '#005080',
        'light-blue': '#508BB9',
        'light-gray': '#E2ECF1',
        'light-green': '#6CF3D5',
        'off-white': '#F4F8F7',
        'medium-white': '#EEF4F6',
        'stroke-blue': 'rgba(80, 139, 185, 0.64)',
        'yellow-1': '#FBBC1B',
        'yellow-2': '#F59D21',
        'yellow-3': '#EF7923',
        'grey-1': '#E8ECEB',
        'grey-2': '#CED2D2',
        'grey-3': '#787076',
        'grey-4': '#444444',
        'gs-white': '#F4F8F7',
        'gs-black': '#000000',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
      },
      fontSize: {
        'h1': ['48px', '150%'],
        'h2': ['32px', '120%'],
        'h3': ['28px', '100%'],
        'h4': ['20px', '150%'],
        'xl': ['24px', '140%'],
        'l': ['18px', '150%'],
        'm': ['16px', '140%'],
        's': ['14px', '140%'],
        'S1': ['24px', '150%'],
        'S2': ['16px', '120%'],
        'S3': ['16px', '100%'],
        'caption': ['12px', '150%'],
        'tag': ['14px', '150%'],
        'tag-small': ['12px', '150%'],
        'category': ['16px', '150%'],
        'contact': ['18px', '120%'],
        'contact-title': ['28px', '120%'],
      },
      lineHeight: {
        'button': '150%',
      },
      spacing: {
        'p-xl': '8px',
        'p-l': '12px',
      },
      maxWidth: {
        '1106': '1106px',
      },
    },
  },
  variants: {},
  plugins: [],
}