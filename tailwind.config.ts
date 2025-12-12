import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        card: "#111111",
        success: "#22c55e",
        danger: "#ef4444",
        info: "#3b82f6",
        accent: "#38bdf8",
      },
      animation: {
        'flash-green': 'flash-green 0.5s ease-in-out',
        'flash-red': 'flash-red 0.5s ease-in-out',
        'in': 'in 0.2s ease-out',
        'out': 'out 0.2s ease-in',
      },
      keyframes: {
        'flash-green': {
          '0%, 100%': { color: '#fff' },
          '50%': { color: '#22c55e' },
        },
        'flash-red': {
          '0%, 100%': { color: '#fff' },
          '50%': { color: '#ef4444' },
        },
        'in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
