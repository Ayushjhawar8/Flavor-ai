// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F97316", // Terracotta Orange
        "background-light": "#FDFBF8", // Creamy Off-white
        "background-dark": "#2C2C2C", // Dark Charcoal for body
        "text-light": "#374151",
        "text-dark": "#E5E7EB",
        "sage-green": "#84A98C",
        "dark-charcoal": "#333333", // Dark Charcoal for text
      },
      fontFamily: {
      display: ["Playfair Display", "serif"], // For headings
      sans: ["Roboto", "sans-serif"],       // Use Roboto for all other text
    },
      
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [require("daisyui")],
};