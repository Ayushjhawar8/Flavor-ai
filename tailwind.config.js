/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          // Override light theme with Tiramisu colors
          "primary": "#6F4E37",
          "primary-focus": "#8B6B4F",
          "primary-content": "#FFFFFF",
          "secondary": "#D4A76A",
          "secondary-focus": "#E0C08C",
          "secondary-content": "#2E1A0F",
          "accent": "#F5DEB3",
          "accent-focus": "#F9E9C7",
          "accent-content": "#2E1A0F",
          "neutral": "#2E1A0F",
          "neutral-focus": "#3E2A1F",
          "neutral-content": "#F5DEB3",
          "base-100": "#FFF8E7",
          "base-200": "#F5E6D3",
          "base-300": "#E8D5B5",
          "base-content": "#2E1A0F",
          "info": "#E8D5B5",
          "info-focus": "#F0E4CC",
          "info-content": "#2E1A0F",
          "success": "#A5D6A7",
          "success-focus": "#B7E0B9",
          "warning": "#FFE082",
          "warning-focus": "#FFE9B0",
          "error": "#EF9A9A",
          "error-focus": "#F5B5B5"
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#60A5FA",
          secondary: "#A78BFA",
          accent: "#34D399",
          neutral: "#111827",
          "base-100": "#1F2937",
          "base-200": "#374151",
          "base-300": "#4B5563",
        },
      },
    ],
  },
};
