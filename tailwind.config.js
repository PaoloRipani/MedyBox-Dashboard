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
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
      },
      fontSize: {
        'h1': ['64px', '120%'],
        'h2': ['48px', '120%'],
        'h3': ['32px', '120%'],
        'h4': ['24px', '120%'],
        'xl': ['24px', '140%'],
        'l': ['18px', '150%'],
        'm': ['16px', '140%'],
        's': ['14px', '140%'],
        'S1': ['24px', '150%'],
        'S2': ['16px', '120%'],
        'caption': ['12px', '150%'],
        'tag': ['14px', '150%'],
        'tag-small': ['12px', '150%'],
        'category': ['16px', '150%'],
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