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
        'restaurant-gradient': 'radial-gradient(circle, #d32f2f 0%, #b71c1c 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
