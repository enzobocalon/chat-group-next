import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['"Noto Sans"', '"sans-serif"'],
    },
    extend: {
      colors: {
        app: {
          DEFAULT: '#252329',
          background: '#120F13',
          foreground: '#0B090C',
        },
      },
      boxShadow: {
        '3xl': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        '2md': '0px 2px 4px 0px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
export default config;
