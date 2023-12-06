import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px", // Extra small devices
        sm: "640px", // Small devices
        md: "952px" // Medium devices, shifted up from the default 'sm'
      }
    }
  },
  plugins: []
};
export default config;
