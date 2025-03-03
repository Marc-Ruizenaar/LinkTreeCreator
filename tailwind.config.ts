import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        DarkBlueMain: "black",
        BlueMain: "#00A896",
        GreenMain: "#22edc8",
        TextGray: "black",
      },
    },
  },
  plugins: [],
} satisfies Config;
