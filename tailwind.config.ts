import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'very-light-gray': '#F8FAFC',
        'light-yellow': '#F5D565',
        'light-beige': '#F5E8D5',
        'orange': '#E9A23B',
        'light-green': '#A0ECB1',
        'green': '#32D657',
        'light-pink': '#F7D4D3',
        'red': '#DD524C',
        'light-blue-gray': '#E3E8EF',
        'medium-gray': '#97A3B6',
        'blue': '#3662E3',
        'semi-transparent-black': '#00000033'
      }
    },
  },
  plugins: [],
};
export default config;
