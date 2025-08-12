/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        colors: {
          50: '#faf7e6',
          100: '#eee8c3',
          200: '#e3d89f',
          300: '#d8c978',
          400: '#ccb952',
          500: '#b39f3a',
          600: '#8b7c2c',
          700: '#63591f',
          800: '#3c3511',
          900: '#151200',
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#6F4E37",
          secondary: "#D4A76A",
          accent: "#F5DEB3",
          neutral: "#2E1A0F",
          "base-100": "#FFF8E7",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#60A5FA",
          secondary: "#A78BFA",
          accent: "#34D399",
          neutral: "#111827",
          "base-100": "#1F2937",
        },
      },
    ],
  },
};
