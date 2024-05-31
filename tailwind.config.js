module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {
      colors: {
        'light-gray': '#AAAAAA',
        'green-1': '#C9ECE3',
        'green-2': '#82C0B1',
        'green-3': '#038667',
        'green-4': '#003233',
        'glass-green': 'rgba(201, 236, 227, 0.24)',
        'glass-green-2': 'rgba(201, 236, 227, 0.40)',
        'glass-green-3': 'rgba(201, 236, 227, 0.64)',
        'medy-black': '#121212',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
      },
      fontSize: {
        'h1': ['48px', '150%'],
        'h1m': ['40px', '120%'],
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