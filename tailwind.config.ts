import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Medical-themed color palette
        medical: {
          primary: '#2563eb', // Deep blue - trust and professionalism
          secondary: '#06b6d4', // Cyan - cleanliness and calm
          accent: '#10b981', // Green - health and wellness
          light: '#f0f9ff', // Very light blue - cleanliness
          dark: '#1e3a8a', // Dark blue - authority
          background: '#ffffff',
          text: '#1e293b',
        },
      },
    },
  },
  plugins: [],
}
export default config
