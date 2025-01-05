import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          "50": "#EBEFF",
          "100": "#D7DEFE",
          "200": "#C7D2FA",
          "300": "#8296FD",
          "400": "#5571FC",
          "500": "#1B3BEA",
          "600": "#042AE6",
          "700": "#0320AF",
          "800": "#14225E",
          "900": "#010B3C",
        },
        alternative: {
          "50": "#FCEDE8",
          "100": "#FADED6",
          "200": "#F4BAA9",
          "300": "#EE9981",
          "400": "#E97858",
          "500": "#E3532D",
          "600": "#C23E1A",
          "700": "#902E13",
          "800": "#5F1E0D",
          "900": "#321007",
        },
        neutral: {
          "50": "#FFFFFF",
          "100": "#EAECEF",
          "200": "#FCFCFC",
          "300": "#FAFAFA",
          "400": "#F8F8F6",
          "500": "#F9F8F2",
          "600": "#B0BCCA",
          "700": "#798DA5",
          "800": "#4C5D71",
          "900": "#303030",
        },
      },
    },
  },
  plugins: [],
};
export default config;
