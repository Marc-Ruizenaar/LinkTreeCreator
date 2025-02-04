import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        DarkBlueMain: "#131f60",
        BlueMain: "#6355ff",
        GreenMain: "#22edc8",
        TextGray: "#b5bcff",
      },
    },
  },
  plugins: [],
} satisfies Config;
