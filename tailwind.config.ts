import type { Config } from "tailwindcss";
import  lineClamp from '@tailwindcss/line-clamp';
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3e51b5",
        bgMain: "#f0f1f9",

      },
    },
  },
  plugins: [
    lineClamp,
  ],
} satisfies Config;
